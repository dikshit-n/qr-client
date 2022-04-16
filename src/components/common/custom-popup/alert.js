import React from "react";
import ReactBSAlert from "react-bootstrap-sweetalert";
// import { Progress } from "@mui/material";

const Alert = ({
  type,
  title,
  message,
  closeButton = {},
  onConfirm,
  onCancel,
  // confirmationProps = {
  //   loading: false,
  //   confirmButton: {
  //     label: "Yes",
  //     onClick: () => {},
  //   },
  //   cancelButton: {
  //     label: "No",
  //     onClick: () => {},
  //   },
  // },
  hideAlert = () => {},
}) => {
  // const [loading, setLoading] = useState(false);

  let alert = <></>;
  if (type === "info") {
    alert = (
      <ReactBSAlert
        dependencies={[type]}
        style={{ display: "block" }}
        title={title}
        confirmBtnText={closeButton?.label || "OK"}
        onConfirm={async () => {
          if (closeButton?.onClick) closeButton.onClick();
          if (onConfirm) await onConfirm();
          hideAlert();
        }}
        onCancel={async () => {
          if (closeButton?.onClick) closeButton.onClick();
          if (onCancel) await onCancel();
          hideAlert();
        }}
        confirmBtnBsStyle="info"
        btnSize=""
      >
        {message}
      </ReactBSAlert>
    );
  } else if (type === "success") {
    alert = (
      <ReactBSAlert
        dependencies={[type]}
        success
        style={{ display: "block" }}
        title={title}
        confirmBtnText={closeButton?.label || "OK"}
        onConfirm={async () => {
          if (closeButton?.onClick) closeButton.onClick();
          if (onConfirm) await onConfirm();
          hideAlert();
        }}
        onCancel={async () => {
          if (closeButton?.onClick) closeButton.onClick();
          if (onCancel) await onCancel();
          hideAlert();
        }}
        confirmBtnBsStyle="info"
        btnSize=""
      >
        {message}
      </ReactBSAlert>
    );
  } else if (type === "error") {
    alert = (
      <ReactBSAlert
        dependencies={[type]}
        error
        style={{ display: "block" }}
        title={title}
        confirmBtnText={closeButton?.label || "OK"}
        onConfirm={async () => {
          if (closeButton?.onClick) closeButton.onClick();
          if (onConfirm) await onConfirm();
          hideAlert();
        }}
        onCancel={async () => {
          if (closeButton?.onClick) closeButton.onClick();
          if (onCancel) await onCancel();
          hideAlert();
        }}
        confirmBtnBsStyle="danger"
        btnSize=""
      >
        {message}
      </ReactBSAlert>
    );
  }
  // else if (type === "confirmation") {
  //   alert = (
  //     <ReactBSAlert
  //       dependencies={[type]}
  //       // dependencies={[loading]}
  //       warning
  //       style={{ display: "block", }}
  //       title={title}
  //       confirmBtnText={
  //         loading ? (
  //           <Progress style={{ width: 20, height: 20 }} />
  //         ) : (
  //           confirmationProps.confirmButton?.label || "Yes"
  //         )
  //       }
  //       cancelBtnText={confirmationProps.cancelButton?.label || "No"}
  //       onConfirm={async () => {
  //         if (confirmationProps.confirmButton?.onClick) {
  //           setLoading(true);
  //           await confirmationProps.confirmButton.onClick();
  //         }
  //         setLoading(false);
  //         if (onConfirm) {
  //           setLoading(true);
  //           await onConfirm();
  //         }
  //         setLoading(false);
  //         hideAlert();
  //       }}
  //       onCancel={async () => {
  //         if (confirmationProps.cancelButton?.onClick)
  //           await confirmationProps.cancelButton.onClick();
  //         if (onCancel) await onCancel();
  //         hideAlert();
  //       }}
  //       confirmBtnBsStyle="info"
  //       cancelBtnBsStyle="danger"
  //       showCancel={!loading}
  //       openAnim={!loading}
  //       btnSize=""
  //     >
  //       {message}
  //     </ReactBSAlert>
  //   );
  // }
  else alert = null;

  return alert;
};

export default Alert;
