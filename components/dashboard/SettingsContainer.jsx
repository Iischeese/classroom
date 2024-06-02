function SettingsContainer({ children }) {
    return (
        <main className="w-full flex flex-col items-center">
            <div className="max-w-[80%] min-w-[50%] flex flex-col py-5">
                {children}
            </div>
        </main>
    )
}

export default SettingsContainer