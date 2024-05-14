function Section({ children }) {
    return (
        <>
            <section className="w-full border border-text/40 rounded-md bg-background">
                {children}
            </section>
        </>
    )
}

function SectionContent({children}){
    return(
        <div className="w-full p-5 flex flex-col gap-3">
            {children}
        </div>
    )
}

function SectionFooter({children}) {
    return (
        <div className="text-sm text-text/60 flex justify-between items-center border-t border-text/40 p-5 py-2">
            {children}
        </div>
    )
}

export {Section, SectionContent, SectionFooter}