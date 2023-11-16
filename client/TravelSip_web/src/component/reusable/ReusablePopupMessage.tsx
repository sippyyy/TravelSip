import React from "react";
import { ReusableButton } from "..";
import { closeModal } from "./ReusableModal";

interface PopupMessageProps {
  message: string;
  redButton?: string;
  greenButton?: string;
  greenFunc?: () => void;
}

const ReusablePopupMessage: React.FC<PopupMessageProps> = (props) => {
  const { message, redButton, greenButton, greenFunc } = props;
  console.log(greenButton)
  return (
    <div>
      <p>{message}</p>
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
              btnText="Yes, Delete!"
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
