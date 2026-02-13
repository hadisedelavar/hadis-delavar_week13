function Modal({ children, setData, setArraySelects, status }) {
  const closeHandler = () => {
    setData((prev) => ({ ...prev, showModal: {...prev.showModal, status: false} }));
    console.log("modul");
    
    setArraySelects([]);
  }
  return (
    <div
      className="bg-black/50 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center"
      onClick={closeHandler}
    >
      <div
        className={`bg-white w-[60%] shadow-md shadow-black/60 rounded-xl p-15 transform ${status ? " scale-0 opacity-0" : "scale-100 opacity-100"} transition-all ease-in-out duration-300 delay-1000`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
