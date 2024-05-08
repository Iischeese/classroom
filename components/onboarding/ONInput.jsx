function ONInput({type, name, id, placeholder}){
    return(
        <input className="min-w-42 w-fit bg-transparent border-4 border-transparent border-dotted border-b-accent/20 focus:border-b-accent/50 transition-[border-bottom-color] focus:outline-none" placeholder={placeholder} type={type} name={name} id={id} />
    )
}

export default ONInput