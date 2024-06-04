function SettingsContainer({ children }) {
    return (
        <main className="w-full flex flex-col items-center">
            <div className="w-[60%] flex flex-col py-5">
                {children}
            </div>
        </main>
    )
}

export default SettingsContainer