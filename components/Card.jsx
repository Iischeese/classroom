function Card({children, className}){
    return(
        <div className={`${className} border border-text/40 rounded-md p-5`}>
            {children}
        </div>
    )
}

export default Card