function Input({id,name,type,required,placeholder}){
    return(
        <input className="w-full px-5 py-3 bg-secondary/50 rounded-md focus:outline-none" id={id} name={name} type={type} required={required} placeholder={placeholder} />
    )
}

export default Input