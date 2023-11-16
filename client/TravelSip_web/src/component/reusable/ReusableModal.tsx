import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

type ModalRefProps = {
  open: (title: string, content?: React.ReactNode, message?: string) => void;
  close: () => void;
};

const modalRef = React.createRef<ModalRefProps>();
// eslint-disable-next-line react-refresh/only-export-components
export const showModal = (
  title: string,
  content?: React.ReactNode,
  message?: string
) => modalRef?.current?.open?.(title, content, message);
// eslint-disable-next-line react-refresh/only-export-components
export const closeModal = () => modalRef?.current?.close?.();

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "400px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: "20px",
  borderRadius: "10px",
  outline: "none",
};

const ReusableModal = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [messageShow, setMessageShow] = React.useState<string | undefined>("");
  const [content, setContent] = React.useState<React.ReactNode | null>(null);
  const handleClose = () => setOpen(false);
  React.useImperativeHandle(
    modalRef,
    () => ({
      open: (title: string, content?: React.ReactNode, message?: string) => {
        setTitle(title);
        if (content) {
          setContent(content);
        }
        if (message) {
          setMessageShow(message);
        }
        setOpen(true);
      },
      close: () => {
        setOpen(false);
      },
    }),
    [open]
  );

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h3 className="text-center font-bold text-large mb-12">{title}</h3>
            {content}
            {messageShow ? <p className="m-12">{messageShow}</p> : null}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ReusableModal;
