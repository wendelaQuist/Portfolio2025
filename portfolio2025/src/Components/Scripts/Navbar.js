import { LuSquareMenu } from "react-icons/lu";
import Logo from "../Images/Logo_Illustration.png"

const Nav = () => {
    const Blur = {
        background: 'rgba(50, 40, 50, 0.2)',
        backdropFilter: 'blur(5px)', 
      };

    return (
        <div style={Blur} className="fixed top-0 left-0 w-full h-[4rem] bg-[rgba(50,40,50,0.2)] backdrop-blur-sm text-pink z-10">
            <div className="hidden lg:flex items-center w-full h-[4rem] xl:max-w-[1250px] mx-auto px-1">
                <a className="flex items-center text-neutral-900 mb-0 mt-0 me-0 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0">
                    <img
                    src={Logo}
                    alt="Logo"
                    className="cursor-pointer h-[calc(4rem-1rem)] object-contain hover:scale-95 transition-all"
                    loading="lazy"
                    href="#"
                /></a>

                <div className="flex-1 flex items0center justify-end space-x-10">
                <ul className="flex items-center space-x-6">
                        <li className="text-sm cursor-pointer relative group hover:text-gray-200">Home<span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#F4DAE2] transition-all duration-300 group-hover:w-full"></span></li>
                        <li className="text-sm cursor-pointer relative group hover:text-gray-200">About me<span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#F4DAE2] transition-all duration-300 group-hover:w-full"></span></li>
                        <li className="text-sm cursor-pointer relative group hover:text-gray-200">Projects<span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#F4DAE2] transition-all duration-300 group-hover:w-full"></span></li>
                        <li className="text-sm cursor-pointer relative group hover:text-gray-200">Contact<span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#F4DAE2] transition-all duration-300 group-hover:w-full"></span></li>
                    </ul>

                    
<form class="max-w-lg mx-auto">
    <div class="flex">
        <button id="dropdown-button" data-dropdown-toggle="dropdown" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
  </svg>
  </button>
        <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
            <li>
                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
            </li>
            <li>
                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
            </li>
            <li>
                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
            </li>
            <li>
                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
            </li>
            </ul>
        </div>
        <div class="relative w-full">
            <input type="search" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search..." required />
            <button type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span class="sr-only">Search</span>
            </button>
        </div>
    </div>
</form>


                </div>
            </div>

                <div className="lg:hidden flex items-center justify-end w-full">
                <LuSquareMenu size={64} style={{height: '4rem', width: '4rem'}} className="text-[#F4DAE2]" />
                </div>

        </div>
    )
}

export default Nav 