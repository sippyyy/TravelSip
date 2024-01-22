import { Tooltip } from "@mui/material";
import { Form, useFormikContext } from "formik";
import React from "react";
import {
  ImageCovered,
  ReusableButton,
  ReusableCalendar,
  ReusableInfoDetails,
  ReusableLoadingModal,
  ReusablePopupMessage,
  ReusableTextField,
} from "../..";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useSafeState, useUpdateEffect } from "ahooks";
import { useMutation } from "react-query";
import { useAuth } from "../../../context/AuthProvider";
import { createProfile, editProfile } from "../../../api/apis/profile";
import { closeModal, showModal } from "../../reusable/ReusableModal";

type ValuesFormProfile = {
  imageUrl: string;
  backgroundUrl: string;
  bio: string;
  nickname: string;
  dob: string;
  mobile: string;
  gender: string;
};

interface FormProfileContextProps {
  statusIn: "idle" | "error" | "loading" | "success";
  idIn: number | string;
}

const FormProfileContent: React.FC<FormProfileContextProps> = (props) => {
  const { statusIn, idIn } = props;
  const { values, setFieldValue } = useFormikContext<ValuesFormProfile>();
  const [dob, setDob] = useSafeState(values?.dob ?? "");
  const [imgBg, setImgBg] = useSafeState<File | undefined>(undefined);
  const [ava, setAva] = useSafeState<File | undefined>(undefined);
  const { authState } = useAuth();

  const handleChange = (event: SelectChangeEvent) => {
    setFieldValue("gender", event.target.value as string);
  };

  useUpdateEffect(() => {
    setFieldValue("dob", dob);
  }, [dob]);

  const { mutate, status } = useMutation({
    mutationFn: (data: FormData) => {
      const token = authState.accessToken;
      if (statusIn === "error") {
        return createProfile(token, data);
      } else {
        return editProfile(token, data, idIn);
      }
    },
  });

  useUpdateEffect(() => {
    if (status === "success") {
      showModal(
        "Completed",
        <ReusablePopupMessage
          message={
            statusIn === "error"
              ? "You completed your profile information successfully"
              : "Edit user profile information completed"
          }
          greenButton="Close"
          greenFunc={() => closeModal()}
          success
        />
      );
    } else if (status === "loading") {
      showModal("Loading data...", <ReusableLoadingModal />);
    } else {
      closeModal();
    }
  }, [status]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", values.bio);
    formData.append("nickname", values.nickname);
    formData.append("dob", values.dob);
    formData.append("mobile", values.mobile);
    formData.append("gender", values.gender);
    if (imgBg) {
      formData.append("backgroundUrl", imgBg);
    }
    if (ava) {
      formData.append("imageUrl", ava);
    }
    mutate(formData);
  };

  return (
    <Form>
      <div className="mx-12 p-12 rounded-2xl bg-white">
        <h2 className=" text-large md:text-xLarge font-bold border-l-[10px] border-solid border-blue pl-8 ">
          Edit Information
        </h2>
        <section className="my-20">
          <h4 className="text-small md:text-medium font-bold my-12">
            Images(Avatar/background):
          </h4>
          <Tooltip arrow title="Change Background Image">
            <>
              <ImageCovered
                src={values.backgroundUrl}
                id="bg_profile"
                img={imgBg}
                setValue={setImgBg}
                width="w-full"
                height="md:h-[300px] h-[150px] "
                width2="md:w-[150px] w-[80px]"
                height2="md:h-[150px] h-[80px]"
                radius="rounded-2xl"
              />
            </>
          </Tooltip>
          <div className="flex my-12">
            <Tooltip arrow title="Change Avatar">
              <>
                <ImageCovered
                  src={values.imageUrl}
                  id="ava_profile"
                  img={ava}
                  setValue={setAva}
                  width="w-[100px] md:w-[150px]"
                  height="h-[100px] md:h-[150px]"
                  width2="w-[30px] md:w-[40px]"
                  height2="h-[30px] md:h-[40px]"
                  radius="rounded-full"
                />
              </>
            </Tooltip>
            <section className="ml-20 flex-1">
              <h4 className="text-small md:text-medium font-bold my-12">
                Basic Information:
              </h4>
              <ReusableInfoDetails
                size="text-small md:text-medium"
                bold
                label="Username: "
                value={"username123"}
              />
              <div className="my-12 flex ">
                <ReusableTextField
                  flex1={true}
                  name="nickname"
                  label="Nickname "
                />
              </div>
              <div className="my-12 flex ">
                <ReusableCalendar
                  size="14px"
                  label="Date of Birth"
                  flex1={true}
                  day={values.dob}
                  setDay={setDob}
                  defaultValue={values.dob}
                  padding="20px"
                />
              </div>
              <div className="my-12 flex ">
                <ReusableTextField
                  flex1={true}
                  name="bio"
                  label="Your introduction "
                />
              </div>
              <div className="my-12 flex ">
                <ReusableTextField
                  flex1={true}
                  name="mobile"
                  label="Your mobile number "
                />
              </div>
              <div className="w-full">
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.gender}
                  label="gender"
                  name="gender"
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                  color="green"
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"none"}>I prefer not to say</MenuItem>
                </Select>
              </div>
            </section>
          </div>
        </section>
        <div className="flex justify-center">
          <ReusableButton
            btnText="Cancel"
            bg="bg-white"
            textColor="text-red"
            border
            borderColor="border-red"
            width="w-[180px]"
            onClick={() => {}}
          />
          <div className="w-[12px]"></div>
          <ReusableButton
            btnText="Submit"
            bg="bg-green"
            textColor="text-white"
            width="w-[180px]"
            onClick={(e) => {
              handleSubmit(e);
            }}
            type="submit"
          />
        </div>
      </div>
    </Form>
  );
};

export default FormProfileContent;
