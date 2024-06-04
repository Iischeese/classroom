function Input({ ref, style, mono, id, name, type, required, placeholder, accept }) {
    return (
        <input ref={ref} className={`${style} placeholder:text-text/80 w-full px-5 py-3 rounded-md focus:outline-none ${"border border-text/40 bg-secondary/50"}`} accept={accept} placeholder={placeholder} id={id} name={name} type={type} required={required} />
    )
}

export default Input