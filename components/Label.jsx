function Label({children, id}){
    return(
       <label className="text-text/50" htmlFor={id}>{children}</label>
    )
}

export default Label