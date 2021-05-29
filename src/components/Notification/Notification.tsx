import React from "react";
import "./Notification.css";

interface NotificationProps {
  message?: string;
  type?: "error" | "success";
}

const Notification: React.FC<NotificationProps> = ({ type, message }) => {
  if (!message) return null;
  return <div className={`notification notification__${type}`}>{message}</div>;
};

export default Notification;
export type { NotificationProps };
