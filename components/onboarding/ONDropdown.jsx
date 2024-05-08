function ONDropdown({ options, id, name }) {
    return (
        <div className="flex items-center gap-2 bg-transparent border-4 border-transparent border-dotted text-accent/50 border-b-accent/20 focus:border-b-accent/50 transition-[border-bottom-color] focus:outline-none">
            <select id={id} name={name} className="text-text appearance-none bg-transparent focus:outline-none">
                {options.map((option, i) => {
                    return (
                        <option  key={i}>
                            {option}
                        </option>
                    )
                })}
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>

        </div>
    )
}

export default ONDropdown