import { Tooltip } from "@mui/material";
import { Form, useFormikContext } from "formik";
import React from "react";
import { ImageCovered, ReusableButton, ReusableTextField } from "../../..";
import { useMutation, useQuery } from "react-query";
import { useAuth } from "../../../../context/AuthProvider";
import { BusinessForm } from "../../../../interface/business.type";
import { createBusiness } from "../../../../api/apis/business";
import { useSafeState } from "ahooks";

type ValuesFormBusiness = {
  imageUrl: string;
  backgroundUrl: string;
  bio: string;
  name: string;
  email: string;
  phone: string;
  tax: string;
};

interface FormBusinessInfoContentProps {
  idIn: number | string;
  statusIn: "idle" | "error" | "loading" | "success";
}

const FormBusinessInfoContent: React.FC<FormBusinessInfoContentProps> = (
  props
) => {
  const { values } = useFormikContext<ValuesFormBusiness>();
  const { idIn, statusIn } = props;
  const { authState } = useAuth();
  const [ava, setAva] = useSafeState<File | undefined>(undefined);
  const [bg, setBg] = useSafeState<File | undefined>(undefined);
  const { mutate, status } = useMutation({
    mutationFn: (data: FormData & BusinessForm) => {
      const token = authState.accessToken;
      if (statusIn === "error") {
        return createBusiness(data, token);
      } else {
        return createBusiness(data, token);
      }
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", values.bio);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("tax", values.tax);
    formData.append("imageUrl", values.imageUrl);
    formData.append("backgroundUrl", values.backgroundUrl);

    if (statusIn === "error") {
      mutate;
    }
  };
  return (
    <Form>
      <div className="mx-12 p-12 rounded-2xl bg-white">
        <h2 className="text-xLarge font-bold border-l-[10px] border-solid border-blue pl-8 ">
          Business Information
        </h2>
        <section className="my-20">
          <h4 className="text-small md:text-medium font-bold my-12">
            Images(Avatar/background):
          </h4>
          <Tooltip arrow title="Change Background Image">
            <>
              <ImageCovered
                id="bg_organization"
                setValue={setBg}
                img={bg}
                width="w-full"
                height=" h-[150px] md:h-[300px]"
                width2="md:w-[150px] w-[80px]"
                height2="md:h-[150px] h-[80px]"
                src="https://img.freepik.com/premium-photo/colorful-landscape-with-mountains-river-foreground_849761-2647.jpg"
                radius="rounded-2xl"
              />
            </>
          </Tooltip>
          <div className="flex my-12">
            <Tooltip arrow title="Change Avatar">
              <>
                <ImageCovered
                  id="ava_organization"
                  setValue={setAva}
                  img={ava}
                  width="w-[100px] md:w-[150px]"
                  height="h-[100px] md:h-[150px]"
                  width2="w-[30px] md:w-[40px]"
                  height2="h-[30px] md:h-[40px]"
                  src="https://img.freepik.com/premium-photo/colorful-landscape-with-mountains-river-foreground_849761-2647.jpg"
                  radius="rounded-full"
                />
              </>
            </Tooltip>
            <section className="ml-20 flex-1">
              <h4 className="text-small md:text-medium font-bold my-12">
                Basic Business Information:
              </h4>
              <div className="my-12 flex ">
                <ReusableTextField
                  flex1={true}
                  name="name"
                  label="Business Name "
                />
              </div>
              <div className="my-12 flex ">
                <ReusableTextField
                  flex1={true}
                  name="bio"
                  label="Business Introduction "
                />
              </div>
              <div className="my-12 flex ">
                <ReusableTextField
                  flex1={true}
                  name="email"
                  label="Your Business Email "
                />
              </div>
              <div className="my-12 flex ">
                <ReusableTextField
                  flex1={true}
                  name="phone"
                  label="Business's Phone Number "
                />
              </div>
              <div className="my-12 flex ">
                <ReusableTextField
                  flex1={true}
                  name="tax"
                  label="Business's Tax Number "
                />
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
            btnText="Save Changes"
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

export default FormBusinessInfoContent;
