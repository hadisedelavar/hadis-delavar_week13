import { IoTrash } from "react-icons/io5";
import { IoBrush } from "react-icons/io5";

function Contact({ contact, data, setData, setArraySelects }) {
  const { activeSelected } = data;

  const editeHandler = () => {
    setData((prev) => ({
      ...prev,
      contact: contact,
      showModal: { status: true, data: "formEdit" },
    }));
  };

  const checkedHandler = (event) => {
    if (event.target.checked) {
      setArraySelects((prev) => [...prev, contact.id]);
      return;
    }
    setArraySelects([contact.id]);
    setData((prev) => ({
      ...prev,
      showModal: {
        ...prev.showModal,
        status: true,
        data: "ask",
        id: contact.id,
      },
    }));
  };

  return (
    <li className="bg-gray-100 px-8 py-4 flex flex-[0_0_30%] items-center justify-between rounded-xl hover:bg-gray-200 text-gray-700 my-2">
      {activeSelected && (
        <input type="checkbox" className="mr-4" onChange={checkedHandler} />
      )}
      <span className="w-[30%]">{`${contact.name} ${contact.lastName}`}</span>
      <span className="w-[30%]">{contact.email}</span>
      <span className="w-[30%]">{contact.phone}</span>
      <div className="w-[30%] flex justify-end gap-6">
        <span onClick={checkedHandler}>
          <IoTrash
            size={35}
            className="hover:bg-blue-800 hover:text-white p-2 rounded-full hover:cursor-pointer transition-all ease-in-out bg-gray-300"
          />
        </span>
        <span onClick={editeHandler}>
          <IoBrush
            size={35}
            className="hover:bg-blue-800 hover:text-white p-2 rounded-full hover:cursor-pointer transition-all ease-in-out bg-gray-300"
          />
        </span>
      </div>
    </li>
  );
}
export default Contact;
