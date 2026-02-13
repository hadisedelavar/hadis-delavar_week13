import Contact from "./Contact";
import { IoAdd, IoCheckmarkDone, IoTrashOutline } from "react-icons/io5";

function ContactsList({ data, setData, arraySelects, setArraySelects }) {
  const { contactsList, activeSelected } = data;

  const selectHandler = (event) => {
    event.stopPropagation();
    setData((prev) => ({ ...prev, activeSelected: true }));
  };

  const deleteAllHandler = (event) => {
    event.stopPropagation();
    setData((prev) => ({
      ...prev,
      showModal: {
        ...prev.showModal,
        status: true,
        data: "ask",
        id: arraySelects,
      },
    }));
  };

  return (
    <>
      {contactsList !== null && contactsList.length !== 0 ? (
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-blue-800 mb-2 text-3xl font-medium">
              Contacts List
            </h2>
            {!activeSelected ? (
              <p
                onClick={selectHandler}
                className="hover:cursor-pointer hover:text-blue-800"
              >
                <IoCheckmarkDone size={22} className="inline mr-2" />
                Select
              </p>
            ) : (
              <button
                onClick={deleteAllHandler}
                className="hover:cursor-pointer hover:text-blue-800 disabled:text-gray-400 disabled:cursor-text"
                disabled={arraySelects.length === 0}
              >
                <IoTrashOutline size={22} className="inline mr-2" />
                Delete All
              </button>
            )}
          </div>
          <ul onClick={(e) => e.stopPropagation()}>
            {contactsList.map((contact) => (
              <Contact
                key={contact.id}
                contact={contact}
                data={data}
                setData={setData}
                setArraySelects={setArraySelects}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center mt-52">
          <p className="text-gray-300 text-5xl">No Contacts Yet!</p>
          <div
            className="text-xl flex items-center justify-center bg-blue-800 text-white mx-auto mt-7 py-2 px-7 rounded-xl w-fit hover:shadow-lg hover:shadow-blue-800/60 transition-all ease-in-out hover:cursor-pointer"
            onClick={() =>
              setData((prev) => ({
                ...prev,
                showModal: { status: true, data: "formAdd" },
              }))
            }
          >
            <IoAdd /> Add New Contact
          </div>
        </div>
      )}
    </>
  );
}
export default ContactsList;
