import * as React from "react";
import Drawer from "@mui/material/Drawer";
type DrawerRefType = {
  open: (
    component: React.ReactNode,
    side: "right" | "left" | "top" | "bottom"
  ) => void;
  close: () => void;
};

const drawerRef = React.createRef<DrawerRefType>();

const showDrawer = (
  component: React.ReactNode,
  side: "right" | "left" | "top" | "bottom"
) => drawerRef.current?.open?.(component, side);
const closeDrawer = () => drawerRef.current?.close?.();

const ReusableDrawer = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [children, setChildren] = React.useState<React.ReactNode>(null);
  const [side, setSide] = React.useState<"right" | "left" | "top" | "bottom">(
    "right"
  );

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  React.useImperativeHandle(
    drawerRef,
    () => ({
      open: (
        component: React.ReactNode,
        side: "right" | "left" | "top" | "bottom"
      ) => {
        setOpen(true);
        setChildren(component);
        setSide(side);
      },
      close: () => {
        setOpen(false);
      },
    }),
    [open]
  );
  return (
    <div>
      <React.Fragment>
        <Drawer anchor={side} open={open} onClose={toggleDrawer(false)}>
          {children}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default ReusableDrawer;
export { showDrawer, closeDrawer };
