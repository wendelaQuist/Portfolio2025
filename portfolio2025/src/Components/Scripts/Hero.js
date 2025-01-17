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
            <div className="relative w-screen h-screen overflow-hidden bg-dark-grey flex flex-col md:flex-row" style={{ paddingTop: "4rem" }}>
                <div className="flex flex-col justify-center items-start w-full md:w-1/2 px-6 md:px-12 text-pink" style={{ paddingTop: "4rem" }}>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to my portfolio</h1>
                        <h2 className="text-base md:text-lg">Browse through the projects I've developed over the past <span>{years}</span> years since starting my journey in IT & Media Design</h2>
                    </div>
                <div className="flex justify-center items-center w-full md:w-1/2 bg-[#14121A]">
                    <img
                        src={leftBlock}
                        alt="Leftblock"
                        style={{ paddingTop: "4rem" }}
                        className="w-[90%] md:w-[80%] lg:w-[60%] h-auto"
                    />
                </div>
            </div>
    )
}

export default Hero