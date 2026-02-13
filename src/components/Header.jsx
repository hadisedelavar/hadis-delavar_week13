import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

function Header({ setData }) {
  const [search, setSearch] = useState("");

  const searchHandler = (event) => {
    const valueSearch = event.target.value;
    const listContactInStorage = JSON.parse(
      localStorage.getItem("contactList"),
    );

    setSearch(valueSearch);

    if (valueSearch === "") {
      setData((prev) => ({ ...prev, contactsList: listContactInStorage }));
    } else {
      const newList = listContactInStorage.filter(
        (contact) =>
          contact.name.includes(valueSearch) ||
          contact.email.includes(valueSearch) ||
          contact.phone.includes(valueSearch),
      );
      setData((prev) => ({ ...prev, contactsList: newList }));
    }
  };

  return (
    <header className="flex justify-between shadow-lg px-44 py-8">
      <form className="relative block">
        <label htmlFor="search">
          <input
            type="text"
            name="search"
            id="search"
            value={search}
            onChange={searchHandler}
            className="border rounded-md border-gray-300 p-2 w-md outline-blue-800"
            placeholder="Search Contact"
          />
          <IoSearchOutline className="absolute right-3 top-2 text-2xl hover:cursor-text" />
        </label>
      </form>
      <h1 className="text-4xl font-bold text-blue-800">Contact App</h1>
    </header>
  );
}

export default Header;
