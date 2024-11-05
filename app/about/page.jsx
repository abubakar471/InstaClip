import { TbArrowUpRight } from "react-icons/tb";
import Link from "next/link";
import Services from "@/components/About/Services/Services";
import Reviews from "@/components/Reviews/Reviews";


const About = () => {
    return (
        <div className="bg-[#202124]">
            <div style={{
                background: `url("/about_bg.png") rgba(0,0,0,0.6)`,
                backgroundSize: "cover",
                backgroundBlendMode: "darken",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }} className="w-full min-h-[70vh] flex items-center justify-center flex-col gap-12 py-20">
                <div className="flex items-center gap-4 text-gray-300/90" data-aos="fade-up" data-aos-delay="300">
                    <TbArrowUpRight size={30} />
                    <p className="font-light">A Digital Creative Agency</p>
                </div>

                <div className="flex flex-col items-center justify-center gap-y-4 w-[90%] lg:w-[60%] mx-auto">
                    <p className="text-4xl lg:text-6xl font-semibold text-center leading-[4.2rem] lg:leading-[5.2rem] !text-gray-100" data-aos="fade-up" data-aos-delay="400">Providing Best Digital Solutions & Grow Business</p>
                    <Link href={`/`} className="bg-transparent hover:bg-[#EAB308] border border-[#EAB308] text-[#EAB308] hover:text-black font-semibold px-8 py-3 flex items-center place-items-center gap-4 mt-4 transition-all duration-300 ease-in-out" data-aos="fade-up" data-aos-delay="500">
                        Get Solutions
                        <TbArrowUpRight size={20} />
                    </Link>
                </div>
            </div>

            <div className="w-full bg-[#202124] py-20">
                <div className="w-[90%] lg:w-[70%] mx-auto">
                    <div className="w-fit flex items-center gap-x-4 justify-between border border-white/50 rounded-full px-10 py-3" data-aos="fade-right" data-aos-delay="300">
                        <p className="hidden lg:inline-block w-[5px] h-[5px] rounded-full bg-yellow-500"></p>
                        <p className="text-white text-lg">Featured Courses</p>
                        <p className="hidden lg:inline-block w-[5px] h-[5px] rounded-full bg-yellow-500"></p>
                    </div>

                    <Services />
                    <Reviews />
                </div>
            </div>
        </div>
    )
}

export default About