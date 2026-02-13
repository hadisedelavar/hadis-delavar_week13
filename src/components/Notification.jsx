import { useEffect } from "react";

function Notification({ type, massage, data: { showNotif:{status} }, setData }) {
  useEffect(() => {
    if (!status) return;

    const timer = setTimeout(() => {
      setData((prev) => ({ ...prev, showNotif: {...prev.showNotif, status:false} }));
    }, 3000);

    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div
      className={`${type === "successful" ? "bg-green-600" : "bg-red-600"} text-white p-4 fixed right-0 top-10 min-w-80 rounded-tl-md rounded-bl-md transition-all ease-in-out duration-300  ${status ? "translate-x-0" : "translate-x-full"}`}
    >
      {massage}
    </div>
  );
}

export default Notification;
