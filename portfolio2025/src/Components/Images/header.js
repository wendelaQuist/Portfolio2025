const Header = () => {
    return (
        <div className="fixed top-4 left-8 right-8 h-[4rem] bg-white/10 backdrop-blur-lg rounded-full shadow-md flex items-center">
            <ul className="flex justify-center gap-8 w-full max-w-4xl mx-auto">
                <li className="text-[#F4DAE2] font-bold text-[1.1rem] cursor-pointer relative group">
                    Home
                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#F4DAE2] font-bold text-[1.1rem] cursor-pointer group transition-all duration-300 group-hover:w-full"></span>
                </li>
                <li className="text-[#F4DAE2] font-medium text-[1rem] cursor-pointer relative group">
                    About Me
                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#F4DAE2] transition-all duration-300 group-hover:w-full"></span>
                </li>
                <li className="text-[#F4DAE2] font-medium text-[1rem] cursor-pointer relative group">
                    Projects
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#F4DAE2] transition-all duration-300 group-hover:w-full"></span>
                </li>
            </ul>
    </div>
    )
}

export default Header