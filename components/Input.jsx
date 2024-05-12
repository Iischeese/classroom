function Input({ mono, id, name, type, required, placeholder }) {
    return (
        <input className={` placeholder:text-text/50 w-full px-5 py-3 rounded-md focus:outline-none ${mono? "bg-text/5 border border-text/40" : "bg-secondary/50"}`} placeholder={placeholder} id={id} name={name} type={type} required={required} />
    )
}

export default Input