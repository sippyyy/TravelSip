import { Tooltip } from "@mui/material";
import { Form, useFormikContext } from "formik";
import React, { useEffect } from "react";
import {
  ImageCovered,
  ReusableButton,
  ReusableCalendar,
  ReusableInfoDetails,
  ReusableTextField,
} from "../..";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useSafeState, useUpdateEffect } from "ahooks";
const FormProfileContent = () => {
  const { values, setFieldValue } = useFormikContext();
  const [dob, setDob] = useSafeState(values?.dob ?? "");
  const handleChange = (event: SelectChangeEvent) => {
    setFieldValue("gender", event.target.value as string);
  };

  useUpdateEffect(() => {
    setFieldValue("dob", dob);
  }, [dob]);


  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(values);
      }}
    >
      <div className="mx-12 p-12 rounded-2xl bg-white">
        <h2 className="text-xLarge font-bold border-l-[10px] border-solid border-blue pl-8 ">
          Edit Information
        </h2>
        <section className="my-20">
          <h4 className="text-medium font-bold my-12">
            Images(Avatar/background):
          </h4>
          <Tooltip arrow title="Change Background Image">
            <>
              <ImageCovered
                width="w-full"
                height="h-[300px]"
                width2="w-[150px]"
                height2="h-[150px]"
                src="https://img.freepik.com/premium-photo/colorful-landscape-with-mountains-river-foreground_849761-2647.jpg"
                radius="rounded-2xl"
              />
            </>
          </Tooltip>
          <div className="flex my-12">
            <Tooltip arrow title="Change Avatar">
              <>
                <ImageCovered
                  width="w-[150px]"
                  height="h-[150px]"
                  width2="w-[40px]"
                  height2="h-[40px]"
                  src="https://img.freepik.com/premium-photo/colorful-landscape-with-mountains-river-foreground_849761-2647.jpg"
                  radius="rounded-full"
                />
              </>
            </Tooltip>
            <section className="ml-20 flex-1">
              <h4 className="text-medium font-bold my-12">
                Basic Information:
              </h4>
              <ReusableInfoDetails
                size="text-medium"
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
            onClick={() => {}}
            type="submit"
          />
        </div>
      </div>
    </Form>
  );
};

export default FormProfileContent;
