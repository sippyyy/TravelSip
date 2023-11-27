import React from "react";
import { ReusableButton } from "..";
import { closeModal } from "./ReusableModal";
import successImg from "../../assets/images/checked.png";

interface PopupMessageProps {
  message: string;
  redButton?: string;
  greenButton?: string;
  success?: boolean;
  greenFunc?: () => void;
}

const ReusablePopupMessage: React.FC<PopupMessageProps> = (props) => {
  const { message, redButton, greenButton, greenFunc, success } = props;
  return (
    <div>
      {success ? (
        <div className="flex justify-center my-20">
          <img src={successImg} className="w-[100px] h-[100px] object-cover" />
        </div>
      ) : null}
      <p className="text-small text-center my-16 md:text-medium">{message}</p>
      <div className="flex justify-center mt-20">
        {redButton ? (
          <ReusableButton
            onClick={() => closeModal()}
            btnText="Cancel"
            border
            borderColor="border-red"
            textColor="text-red"
            flex1
          />
        ) : null}
        {greenButton ? (
          <>
            <div className="w-[12px]"></div>
            <ReusableButton
              onClick={() => greenFunc?.()}
              btnText={greenButton}
              textColor="text-white"
              bg="bg-green"
              flex1
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ReusablePopupMessage;
