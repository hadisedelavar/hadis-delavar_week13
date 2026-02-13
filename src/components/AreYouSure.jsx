function AreYouSure({ data, setData, arraySelects, setArraySelects }) {
  const deleteHandler = (event) => {
    if (event.target.innerText === "No") {
      setData((prev) => ({
        ...prev,
        showModal: { ...prev.showModal, status: false },
        activeSelected: false,
      }));
    } else {
      const newList = data.contactsList.filter(
        (item) => !arraySelects.includes(item.id),
      );
      setData((prev) => ({
        ...prev,
        contactsList: newList,
        showModal: { ...prev.showModal, status: false },
        activeSelected: false,
      }));
      localStorage.setItem("contactList", JSON.stringify(newList));
      setData(prev => ({...prev, showNotif:{status: true, massage: `delete ${arraySelects.length} contacts`, type: "successful"}}))
    }
    console.log("are you sure");

    setArraySelects([]);
  };

  return (
    <div>
      <span className="text-3xl mb-10 block text-center">Are You Sure?</span>
      <div className="flex gap-4 justify-center items-center">
        <button
          onClick={deleteHandler}
          className="w-32 col-span-2 py-2 px-3.5 rounded-md border border-blue-800 text-xl bg-blue-800 text-white transition-all ease-in-out hover:shadow-lg hover:shadow-blue-800/65 hover:cursor-pointer"
        >
          Yes
        </button>
        <button
          onClick={deleteHandler}
          className="w-32 col-span-2 py-2 px-3.5 rounded-md border border-red-800 text-xl bg-red-800 text-white transition-all ease-in-out hover:shadow-lg hover:shadow-red-800/65 hover:cursor-pointer"
        >
          No
        </button>
      </div>
    </div>
  );
}

export default AreYouSure;
