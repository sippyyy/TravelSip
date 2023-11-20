import { Tooltip } from "@mui/material";
import { Form, useFormikContext } from "formik";
import React from "react";
import {
  ImageCovered,
  ReusableButton,
  ReusableInfoDetails,
  ReusableTextField,
} from "../../..";

type ValuesFormBusiness = {
  imageUrl: string;
  backgroundUrl: string;
  bio: string;
  name: string;
  email: string;
  phone: string;
  tax: string;
};

const FormBusinessInfoContent = () => {
  const { values } = useFormikContext<ValuesFormBusiness>();

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(values);
      }}
    >
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
            onClick={() => {}}
            type="submit"
          />
        </div>
      </div>
    </Form>
  );
};

export default FormBusinessInfoContent;
