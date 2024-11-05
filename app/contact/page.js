import ContactForm from "@/components/Contact/ContactForm/ContactForm"
import Link from "next/link"
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";


const Contact = () => {
    return (
        <div className="w-full">
            <div className="w-full bg-[#202124]">
                <div className="w-[90%] lg:w-[80%] mx-auto min-h-[50vh] flex items-center justify-between flex-wrap lg:flex-nowrap gap-10 py-20" data-aos="fade-down" data-aos-delay="200">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <div className="w-[5px] h-[5px] bg-yellow-300 rounded-full"></div>
                            <h4 className="text-lg text-gray-300/80">CONTACT US</h4>
                        </div>

                        <div className="py-4">
                            <h3 className="text-6xl font-semibold flex flex-col text-gray-100">
                                <span>Let's make </span>
                                <span>your brand brilliant<span className="text-yellow-300">!</span></span>
                            </h3>
                        </div>
                    </div>

                    <div className="w-full lg:w-[600px] text-gray-300">
                        We help our clients succeed by creating brand identities, digital experiences, and print materials that communicate clearly, achieve marketing goals, and look fantastic.
                    </div>
                </div>
            </div>

            <div className="w-full bg-[#2d2e33] min-h-[50vh] py-20">
                <div className="w-[90%] lg:w-[70%] mx-auto flex items-center justify-between flex-wrap lg:flex-nowrap gap-y-20">
                    <div className="w-full lg:w-1/2" data-aos="fade-right" data-aos-delay="500">
                        <div className="border border-gray-300 px-10 py-2 rounded-full w-fit text-white">Get in touch</div>

                        <div className="py-12">
                            <h3 className="text-5xl font-semibold flex flex-col leading-relaxed text-white">
                                <span>Let's Get In </span>
                                <span>Touch With Us<span className="text-yellow-300">.</span></span>
                            </h3>

                            <p className="text-gray-300 py-4">
                                If you would like to work with us or just want to get in touch, we’d love to hear from you!
                            </p>

                            <p className="text-gray-300 font-semibold text-3xl py-4">+1 840 841 25 69</p>
                        </div>

                        <div className="flex items-center gap-6">
                            <Link href={`/`} className="text-sm text-gray-300">Facebook</Link>
                            <Link href={`/`} className="text-sm text-gray-300">Instagram</Link>
                            <Link href={`/`} className="text-sm text-gray-300">Twitter</Link>
                            <Link href={`/`} className="text-sm text-gray-300">LinkedIn</Link>
                        </div>
                    </div>


                    {/* <ContactForm /> */}

                    <div className="w-full lg:w-1/2 flex items-center justify-center" data-aos="fade-right" data-aos-delay="5gi00">
                        <div className="w-full lg:w-[80%] mx-auto flex gap-y-8 justify-center flex-col bg-[#202124] rounded-3xl p-10 min-h-[400px]">
                            <div className="flex items-center flex-wrap gap-4">
                                <div className="bg-yellow-500 rounded-full p-4 flex items-center">
                                    <FaPhone color="#202124" size={24} />
                                </div>
                                <div className="flex flex-col text-gray-300">
                                    <span>Phone</span>
                                    <span className="font-semibold">
                                        +1 840 841 25 69
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center flex-wrap gap-4">
                                <div className="bg-yellow-500 rounded-full p-4 flex items-center">
                                    <MdEmail color="#202124" size={24} />
                                </div>
                                <div className="flex flex-col text-gray-300">
                                    <span>E-mail</span>
                                    <span className="font-semibold">
                                        abubakar.devs@gmail.com
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center flex-wrap gap-4">
                                <div className="bg-yellow-500 rounded-full p-4 flex items-center">
                                    <IoLocationSharp color="#202124" size={24} />
                                </div>
                                <div className="flex flex-col text-gray-300">
                                    <span>Address</span>
                                    <span className="font-semibold">
                                    123 Anywhere, St. Any City
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact