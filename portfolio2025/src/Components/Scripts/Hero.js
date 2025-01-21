import leftBlock from "../Images/Left_block_pink.png"
import { useEffect, useState } from "react";

const Hero = () => {

    const [years, setYear] = useState(0)

    useEffect(() => {
        const startYear = 2021
        const currentYear = new Date().getFullYear()
        setYear(currentYear - startYear)
    }, [])

    return (
            <div className="relative w-screen h-screen overflow-hidden bg-dark-grey flex flex-col md:flex-row">
                <div className="flex flex-col items-start w-full md:w-1/2 px-6 md:px-12 text-pink">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to my portfolio</h1>
                        <h2 className="text-base md:text-lg">Browse through the <a href="#" className="text-decoration-line: underline cursor-pointer">projects</a> I've developed over the past <span>{years}</span> years since starting my journey in IT & Media Design</h2>
                    </div>
            </div>
    )
}

export default Hero