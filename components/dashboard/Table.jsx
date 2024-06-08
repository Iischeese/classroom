import ResponsePreview from "@/app/dashboard/classes/[id]/assignments/[assignment]/ResponsePreview"

function Table({ children, headingItems }) {
    return (
        <table className="text-left border-separate border-spacing-0 border border-text/40 rounded-md">
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
            <tbody>
                {
                    children
                }
            </tbody>
        </table>
    )
}

export default Table