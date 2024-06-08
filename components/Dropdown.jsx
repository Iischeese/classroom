function Dropdown({ options, name }){
    return(
       <select className="bg-secondary border border-text/40 placeholder:text-text/50 w-full px-5 py-3 rounded-md focus:outline-none appearance-none" name={name} id={name}>
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