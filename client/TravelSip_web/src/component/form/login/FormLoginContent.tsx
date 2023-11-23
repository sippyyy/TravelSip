import { Form, useFormikContext } from "formik";
import React from "react";
import { ReusableButton, ReusableTextField } from "../..";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { Login } from "../../../interface/login.type";
import { login } from "../../../api/apis/login";
import { useUpdateEffect } from "ahooks";

const FormLoginContent = () => {
  const { values } = useFormikContext<Login>();
  const navigate = useNavigate();

  const { mutate, data } = useMutation({
    mutationFn: (data: Login) => {
      return login(data);
    },
  });

  useUpdateEffect(() => {
    if (data?.status === 200) {
      localStorage.setItem("access_token", data.data.access);
      localStorage.setItem("refresh_token", data.data.refresh);
      navigate("/");
    }
  }, [data]);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    mutate(values);
  };

  return (
    <Form className=" flex flex-1 justify-center md:justify-end min-h-[70%]">
      <div className="bg-white rounded-2xl w-full md:w-[400px] shadow-2xl overflow-hidden ">
        <h1 className="font-xBold text-center text-[40px] text-white tw-[130%] py-20 bg-red">
          T r a v e l S i p
        </h1>
        <div className="p-20">
          <h2 className="font-bold text-xxLarge text-red text-center mt-12 mb-40">
            Login
          </h2>
          <div className="my-40 flex">
            <ReusableTextField name="username" label="Username" flex1 />
          </div>
          <div className="my-40 flex">
            <ReusableTextField
              name="password"
              type="password"
              label="Password"
              flex1
            />
          </div>
          <div className="flex my-40">
            <ReusableButton
              flex1
              btnText="Sign In"
              bg="bg-green"
              textColor="text-white"
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            />
          </div>
          <div className="my-40 text-center">
            <p className="text-small text-gray my-20">
              Don't have an account ?
            </p>
            <Link className="text-blue hover:font-bold" to="/register">
              Sign up now!!
            </Link>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default FormLoginContent;
