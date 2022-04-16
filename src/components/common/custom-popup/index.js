import React, { useEffect, useRef, useState } from "react";
import { EventEmitter } from "@/utils";
import Alert from "./alert";
import Router from "next/router";

export const PopupMessage = () => {
  let [visibility, setVisibility] = useState(false);
  const [content, setContent] = useState({
    title: "",
    message: "",
  });
  const [closeButton, setCloseButton] = useState({
    label: "OK",
    onClick: () => setVisibility(false),
  });
  const [onConfirm, setOnConfirm] = useState(null);
  const [onCancel, setOnCancel] = useState(null);
  const [type, setType] = useState("");
  const [triggered, setTriggered] = useState(null);
  const [CustomAlert, setCustomAlert] = useState(null);
  const customAlertRef = useRef();

  const listenToEvent = () => {
    EventEmitter.addListener(
      "popup",
      ({
        title,
        message,
        type: newType = "success",
        closeButton = {
          label: "OK",
          onClick: () => setVisibility(false),
        },
        onConfirm: onConfirmFunction,
        onCancel: onCancelFunction,
        component: NewCustomAlert,
      }) => {
        // check if already there is an custom alert, if exists then set it to null
        if (!!customAlertRef.current) setCustomAlert(null);
        // now set the new custom alert to be rendered
        if (!!NewCustomAlert) {
          customAlertRef.current = (
            <NewCustomAlert onCancel={() => setVisibility(false)} />
          );
          setCustomAlert(
            <NewCustomAlert onCancel={() => setVisibility(false)} />
          );
        }
        setContent({ title, message });
        setOnConfirm(() => onConfirmFunction);
        setOnCancel(() => onCancelFunction);
        setCloseButton(closeButton);
        setType(newType);
        // to identify whether this event is triggered (using useEffect), we can set a distinct value every time.
        setTriggered(new Date().getTime());
      }
    );
  };

  useEffect(() => {
    listenToEvent();
    return () => setCustomAlert(null);
  }, []);

  // close the popup on route change
  useEffect(() => {
    Router.events.on("routeChangeComplete", () => {
      setVisibility(false);
    });
    return function cleanup() {
      setVisibility(false);
    };
  }, []);

  useEffect(() => {
    setVisibility(false);
    setTimeout(() => {
      setVisibility(true);
    }, 100);
  }, [triggered]);

  return (
    visibility &&
    (CustomAlert ? (
      CustomAlert
    ) : (
      <Alert
        type={type}
        {...content}
        onConfirm={onConfirm}
        onCancel={onCancel}
        closeButton={closeButton}
        visibility={visibility}
        hideAlert={() => setVisibility(false)}
      />
    ))
  );
};
