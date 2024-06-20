function Bento({children, rows, cols, className}){
    return(
        <div className={`${className} grid grid-cols-${cols} grid-rows-${rows} gap-8`}>
            {children}
        </div>
    )
}

export default Bento