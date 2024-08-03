
const Layout = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <main className="flex-1 overflow-hidden">{children}</main>
        </div>

    )
}

export default Layout