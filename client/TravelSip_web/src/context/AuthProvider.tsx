import { useSafeState, useUpdateEffect } from "ahooks";
import React, { createContext, useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { refresh, verify } from "../api/apis/login";
import { jwtDecode } from "jwt-decode";
import { closeModal, showModal } from "../component/reusable/ReusableModal";
import { ReusableLoadingModal } from "../component";

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProvideProps {
  children: React.ReactNode;
}

interface JwtType {
  user_id: number;
}

export interface StateAuth {
  refreshToken: string;
  accessToken: string;
  authenticated: boolean;
  id: number;
}

interface Values {
  authState: StateAuth;
  logout: () => void;
  loadToken: () => void;
  verifyToken: () => void;
}
const AuthContext = createContext<Values>();

const AuthProvider: React.FC<AuthProvideProps> = (props) => {
  const { children } = props;
  const [authState, setAuthState] = useSafeState<StateAuth>({
    accessToken: "",
    refreshToken: "",
    authenticated: false,
    id: 0,
  });

  const { mutate, data, error, status } = useMutation({
    mutationFn: async (type: "verify" | "getnew") => {
      const refreshToken = localStorage.getItem("refresh_token");
      console.log(refreshToken)
      if (refreshToken) {
        if (type === "verify") {
          return await verify({ token: refreshToken });
        } else {
          return await refresh({ refresh: refreshToken });
        }
      } else {
        return "";
      }
    },
  });

  useUpdateEffect(() => {
    if (status === "loading") {
      showModal("Loading data...", <ReusableLoadingModal />);
    } else {
      closeModal();
    }
  }, [status]);

  const verifyToken: () => void = () => {
    mutate("verify");
  };

  useEffect(() => {
    verifyToken();
  }, []);

  useUpdateEffect(() => {
    if (data) {
      if (data?.data?.access && data?.data?.refresh) {
        localStorage.setItem("refresh_token", data.data.refresh);
        localStorage.setItem("access_token", data.data.access);
        loadToken();
      } else {
        mutate("getnew");
      }
    } else if (error) {
      logout();
    }
  }, [data, error]);

  const loadToken: () => void = () => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    if (accessToken && refreshToken) {
      const user_data_decoded: JwtType = jwtDecode(accessToken);
      const user_id = user_data_decoded.user_id;
      setAuthState({
        accessToken,
        refreshToken,
        authenticated: true,
        id: user_id,
      });
    }
  };

  const logout: () => void = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAuthState({
      accessToken: "",
      refreshToken: "",
      authenticated: false,
      id: 0,
    });
  };

  const values: Values = {
    authState,
    logout,
    loadToken,
    verifyToken,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
