function Dropdown({ options, name }){
    return(
       <select name={name} id={name} className="bg-secondary border border-text/40 placeholder:text-text/50 w-full px-5 py-3 rounded-md focus:outline-none appearance-none" >
        {
            options.map((option, index)=>{
                return(
                    <option key={index}>{option}</option>
                )
            })
        }
       </select>
    )
}

export default Dropdown