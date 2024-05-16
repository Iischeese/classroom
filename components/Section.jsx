function Section({ children, danger }) {
    return (
        <>
            <section className={`overflow-clip w-full border ${danger ? "border-red-500" : "border-text/40"} rounded-md bg-background`}>
                {children}
            </section>
        </>
    )
}

function SectionContent({ children }) {
    return (
        <div className="w-full p-5 flex flex-col gap-3">
            {children}
        </div>
    )
}

function SectionFooter({ children, danger }) {
    return (
        <div className={`text-sm text-text/60 ${danger? "bg-red-900/80" : ""} flex justify-between items-center border-t ${danger ? "border-red-500" : "border-text/40"} p-5 py-2`}>
            {children}
        </div>
    )
}

export { Section, SectionContent, SectionFooter }