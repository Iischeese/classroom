function SettingsContainer({ children }) {
    return (
        <main className="w-full flex flex-col items-center">
            <div className="lg:w-[60%] w-[90%] flex flex-col py-5">
                {children}
            </div>
        </main>
    )
}

export default SettingsContainer