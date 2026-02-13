import { useState } from "react";
import ContactsList from "./components/ContactsList";
import Header from "./components/Header";
import Notification from "./components/Notification";
import Modal from "./components/Modal";
import Form from "./components/Form";
import { IoAdd } from "react-icons/io5";
import AreYouSure from "./components/AreYouSure";

function App() {
  const list = localStorage.getItem("contactList");
  const [arraySelects, setArraySelects] = useState([]);

  const [data, setData] = useState({
    contactsList: list === null ? [] : JSON.parse(list),
    showModal: { status: false, data: "form", isDelete: false, id: null },
    activeSelected: false,
    showNotif: { status: false, massage: "", type: "" },
    contact: { name: "", lastName: "", email: "", phone: "" },
  });

  const closeHandler = () => {
    setData((prev) => ({ ...prev, activeSelected: false }));
    setArraySelects([]);
  };

  return (
    <div onClick={closeHandler}>
      <Header setData={setData} />

      <main className="w-[65%] my-12 mx-auto">
        <ContactsList
          data={data}
          setData={setData}
          arraySelects={arraySelects}
          setArraySelects={setArraySelects}
        />
        <div className="bg-blue-800 text-white p-3 size-15  overflow-hidden rounded-full fixed bottom-10 left-10 flex items-center justify-center hover:shadow-lg hover:shadow-blue-800/60 transition-all ease-in-out hover:cursor-pointer">
          <IoAdd
            size={30}
            onClick={() =>
              setData((prev) => ({
                ...prev,
                showModal: { status: true, data: "formAdd" },
              }))
            }
          />
        </div>
      </main>

      {/* نمایش مودال */}
      {data.showModal.status && (
        <Modal setData={setData} setArraySelects={setArraySelects} status={data.showNotif.status}>
          {data.showModal.data === "ask" ? (
            <AreYouSure
              data={data}
              setData={setData}
              arraySelects={arraySelects}
              setArraySelects={setArraySelects}
            />
          ) : (
            <Form data={data} setData={setData} />
          )}
        </Modal>
      )}

      {/* نمایش نوتیفیکیشن  */}
        <Notification
        status = {data.showNotif.statu}
          massage={data.showNotif.massage}
          type={data.showNotif.type}
          data={data}
          setData={setData}
        />
    </div>
  );
}

export default App;
