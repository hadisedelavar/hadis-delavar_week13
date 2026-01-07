function TabTitle({name, data:{title, description}, setTitel, setDescription, active, setActive}) {

    const clickHandler = () => {
        setTitel(title)
        setDescription(description)
        setActive(title);
    }
    
  return (
    <li onClick={clickHandler} className={active === title ? "active" : null}>{name}</li>
  )
}

export default TabTitle