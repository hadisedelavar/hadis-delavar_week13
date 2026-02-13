import { useEffect, useState } from "react";
function Form({ data, setData }) {
  
  const { contactsList, contact, showModal } = data;

  const [error, setError] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
  setDisabled(Object.values(error).every((val) => val === "") &&
    Object.values(contact).every((val) => val !== ""));
}, [error, contact]);

  const generateId = () => {
    return Math.round(
      Math.random() * Math.random() * Math.pow(10, 15),
    ).toString();
  };

  const validation = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (value === "") return setError((prev) => ({ ...prev, [name]: "Required fields" }));

    if (name === "name" || name === "lastName") {
      if (value.length < 3)
        return setError((prev) => ({ ...prev, [name]: "Minimum 3 characters" }));
      else return setError((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "email") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value))
        return setError((prev) => ({ ...prev, [name]: "Valid email format" }));
      else return setError((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "phone") {
      const mobileRegex = /^(?:\+98|98|0)9\d{9}$/;
      const landlineRegex = /^0\d{2,3}\d{8}$/;

      if (!mobileRegex.test(value) && !landlineRegex.test(value))
        return setError((prev) => ({ ...prev, [name]: "Valid phone" }));
      else return setError((prev) => ({ ...prev, [name]: "" }));
    }

    return {
      name: "",
      lastName: "",
      email: "",
      phone: "",
    };
  };

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, contact: { ...contact, [name]: value } }));
    validation(event);
    console.log(error);
    console.log(contact);
    
    setDisabled(
      Object.values(error).every((value) => value === "") &&
        Object.values(contact).every((value) => value !== ""),
    );
  };
  
  const submitHandler = (event) => {
    event.preventDefault();

    if (!disabled) return;

    if (showModal.data === "formEdit") {
      const index = contactsList.findIndex((item) => item.id === contact.id);
      contactsList.splice(index, 1, contact);
      localStorage.setItem("contactList", JSON.stringify(contactsList));
      setData((prev) => ({
        ...prev,
        showNotif: {
          status: true,
          type: "successful",
          massage: "edite successful",
        },
        showModal: {
          ...prev.showModal,
          status: false,
        },
      }));
      return;
    }

    if (showModal.data === "formAdd") {
      const id = generateId();

      if (contactsList.length === 0) {
        setData((prev) => ({ ...prev, contactsList: [{ id, ...contact }] }));

        localStorage.setItem(
          "contactList",
          JSON.stringify([{ id, ...contact }]),
        );
      } else {
        setData((prev) => ({
          ...prev,
          contactsList: [...prev.contactsList, { id, ...contact }],
        }));

        localStorage.setItem(
          "contactList",
          JSON.stringify([...contactsList, { id, ...contact }]),
        );
      }

      setData((prev) => ({
        ...prev,
        contact: {
          name: "",
          lastName: "",
          email: "",
          phone: "",
        },
        showNotif: {
          status: true,
          type: "successful",
          massage: "add successful",
        },
        showModal: {
          ...prev.showModal,
          status: false,
        },
      }));
    }
  };

  return (
    <>
      {/* فرم */}
      <div className="">
        <form onSubmit={submitHandler} className="grid grid-cols-2 gap-7">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={contact.name}
              onChange={changeHandler}
              className={`${error.name ? "outline-red-800 focus:outline-red-800" : "focus:outline-blue-800"} w-full py-2 px-4 rounded-md border-none text-xl outline outline-gray-300 text-blue-800 placeholder:text-gray-600`}
            />
            {error.name && (
              <p className="mt-1 px-1 py-0 w-fit text-[13px] text-red-800">
                {error.name}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={contact.lastName}
              onChange={changeHandler}
              className={`${error.lastName ? "outline-red-800 focus:outline-red-800" : "focus:outline-blue-800"} w-full py-2 px-4 rounded-md border-none text-xl outline outline-gray-300 text-blue-800 placeholder:text-gray-600`}
            />
            {error.lastName && (
              <p className="mt-1 px-1 py-0 w-fit text-[13px] text-red-800">
                {error.lastName}
              </p>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={contact.email}
              onChange={changeHandler}
              className={`${error.email ? "outline-red-800 focus:outline-red-800" : "focus:outline-blue-800"} w-full py-2 px-4 rounded-md border-none text-xl outline outline-gray-300 text-blue-800 placeholder:text-gray-600`}
            />
            {error.email && (
              <p className="mt-1 px-1 py-0 w-fit text-[13px] text-red-800">
                {error.email}
              </p>
            )}
          </div>
          <div>
            <input
              type="phone"
              name="phone"
              placeholder="Phone"
              value={contact.phone}
              onChange={changeHandler}
              className={`${error.phone ? "outline-red-800 focus:outline-red-800" : "focus:outline-blue-800"} w-full py-2 px-4 rounded-md border-none text-xl outline outline-gray-300 text-blue-800 placeholder:text-gray-600`}
            />
            {error.phone && (
              <p className="mt-1 px-1 py-0 w-fit text-[13px] text-red-800">
                {error.phone}
              </p>
            )}
          </div>

          <button
            disabled={!disabled}
            className={`${!disabled ? "bg-gray-300 hover:shadow-lg hover:shadow-gray-300/65 hover:cursor-text text-gray-600 border-gray-300" : "bg-blue-800 hover:shadow-lg hover:shadow-blue-800/65 hover:cursor-pointer text-white border-blue-800" }  col-span-2 py-2 px-3.5 rounded-md border  text-xl   transition-all ease-in-out`}
            type="submit"
          >
            {showModal.data === "formAdd" && "Add Contact"}
            {showModal.data === "formEdit" && "Edit Contact"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Form;
