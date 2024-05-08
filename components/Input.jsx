function Input({id,name,type,required}){
    return(
        <input className="w-full px-5 py-3 bg-secondary/50 rounded-md focus:outline-none" id={id} name={name} type={type} required={required} />
    )
}

export default Input