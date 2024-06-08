function Table({ children, headingItems }) {
    return (
        <table className="w-full text-left border-separate border-spacing-0 border border-text/40 rounded-md">
            <thead className="bg-primary/10">
                <tr>
                    {
                        headingItems.map((value, index) => {
                            return (
                                <th key={index} className="p-3">{value}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody className="w-full">
                {
                    children
                }
            </tbody>
        </table>
    )
}

export default Table