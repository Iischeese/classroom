function Bento({children}){
    return(
        <div className="grid grid-cols-4 grid-rows-3 gap-8">
            {children}
        </div>
    )
}

export default Bento