import { Form } from "formik";
import React from "react";
import { ReusableButton, ReusableTextField } from "../..";
import { Link, useNavigate } from "react-router-dom";

const FormRegisterContent = () => {
    const navigate =  useNavigate()

    const handleSubmit = (event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault()
        navigate('/login')
    }

  return (
    <Form className=" flex flex-1 justify-end min-h-[70%]">
      <div className="bg-white rounded-2xl w-[400px] shadow-2xl overflow-hidden ">
        <h1 className="font-xBold text-center text-[40px] text-white tw-[130%] py-20 bg-red">
            T r a v e l S i p
          </h1>
        <div className="p-20">
        <h2 className="font-bold text-xxLarge text-red text-center mt-12 mb-40">
          Register
        </h2>
        <div className="my-20 flex">
          <ReusableTextField name="username" label="Username" flex1 />
        </div>
        <div className="my-20 flex">
          <ReusableTextField name="email_address" type="email" label="Email Address" flex1 />
        </div>
        <div className="my-20 flex">
          <ReusableTextField name="first_name"label="First Name" flex1 />
        </div>
        <div className="my-20 flex">
          <ReusableTextField name="last_name" label="Last Name" flex1 />
        </div>
        <div className="my-20 flex">
          <ReusableTextField name="password" type="password" label="Password" flex1 />
        </div>
        <div className="flex my-20">
          <ReusableButton
            flex1
            btnText="Sign Up"
            bg="bg-green"
            textColor="text-white"
            type="submit"
            onClick={(e) => {handleSubmit(e)}}
          />
        </div>
        <div className="my-20 text-center">
            <p className="text-small text-gray my-20">
                Already have an account ?
            </p>
            <Link className="text-blue hover:font-bold" to="/login">Sign in now!!</Link>
        </div>
        </div>
      </div>
    </Form>
  );
};

export default FormRegisterContent;
