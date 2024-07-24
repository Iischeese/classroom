function Input({ ref, style, onChange, id, name, type, required, placeholder, accept, ...props }) {
    return (
        <input {...props} onChange={onChange} ref={ref} className={`${style} placeholder:text-text/50 w-full px-5 py-3 rounded-md focus:outline-none border border-text/40 bg-secondary `} accept={accept} placeholder={placeholder} id={id} name={name} type={type} required={required} />
    )
}

export default Input