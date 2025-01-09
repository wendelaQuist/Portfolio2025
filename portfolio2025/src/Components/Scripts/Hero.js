import leftBlock from "../Images/Hero_block.png"

const Hero = () => {
    return (
        <div className="absolute top-0 right-0 w-full h-screen overflow-hidden bg-[#F4DAE2]">
                <img
                    src={leftBlock}
                    className="absolute right-4 top-[calc(4rem+3rem)] max-w-[80%] max-h-[80%] md:max-w-[80%] md:max-h-[87%] <style>"
                />
            </div>
    )
}

export default Hero