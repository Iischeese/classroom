function SplitView({children}){
    return(
        <>
            <main className="w-2/5 min-w-[30rem] bg-secondary/20 p-10 h-screen flex flex-col items-start justify-center gap-8">
                {children}
            </main>
        </>
    )
}

export default SplitView