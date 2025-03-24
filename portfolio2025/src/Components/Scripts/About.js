import Store from "../Images/Nterra_winkel.jpg";

const About = () => {
    return (
        <section class="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-pink text-dark-grey">
            <div class="flex flex-col md:flex-row items-start justify-center max-w-7xl w-full">
                
                {/* Text Content */}
                <div class="md:w-1/2 flex flex-col p-0">
                    <h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl mb-2">
                        My name is <br /> Wen Quist
                    </h2>
                    <p class="text-xl text-gray-600 dark:text-gray-300 mt-0">
                        I am a passionate technologist and an enthusiastic student of IT & Media Design. 
                        <br></br>
                        From the age of ten, computers have been part of my life, thanks to my dad who introduced me to his computer store. There, I learned the impact of technology on society and enjoyed everything from customer service to hardware analysis. 
                        <br></br>
                        I aim to contribute positively to our technologically interconnected world through each project I undertake.
                    </p>
                </div>

                {/* Image */}
                <div class="md:w-1/2 flex justify-center mt-6 md:mt-0">
                    <img class="rounded-lg shadow-xl max-w-full h-auto" src={Store} alt="Store" />
                </div>
            </div>
        </section>
    );
}

export default About;
