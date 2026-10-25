import Img7 from '../assets/images/Img7.jpg'
import Img8 from '../assets/images/Img8.webp'

export const Section4 = () => {
    return (
        <section className="p-4 sm:p-8 lg:p-16 max-w-7xl mx-auto flex flex-col gap-16 md:gap-24 overflow-hidden font-sans text-stone-800">
            
            {/* BLOCK 1: GENTLE REMINDERS */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                {/* Text content stays prominent on portrait, wraps cleanly */}
                <div className="flex flex-col gap-4 w-full lg:w-1/2">
                    <p className="px-4 py-1 border-none rounded-full bg-purple-400 text-center text-white text-xs font-semibold tracking-wide w-fit whitespace-nowrap">
                        01-GENTLE REMINDERS
                    </p>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 leading-tight">
                            Not nagging. <br className="hidden sm:inline" /> Just the right nudge.
                        </h3>
                        <p className="text-stone-500 font-medium text-sm sm:text-base">
                            Just the right nudge at the right time, so you never forget to log.
                        </p>
                    </div>
                </div>
                {/* Images switch to flexible aspect ratios to handle wide landscape heights seamlessly */}
                <div className="w-full lg:w-1/2 max-w-[480px] aspect-square rounded-2xl overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <img src={Img7} alt="Gentle Reminders UI Interface mockup" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* BLOCK 2: SIMPLE BUDGETS */}
            {/* lg:flex-row-reverse swaps the order on desktops to keep that checkerboard rhythm from the design mockup */}
            <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-8 lg:gap-12">
                <div className="flex flex-col gap-4 w-full lg:w-1/2">
                    <p className="px-4 py-1 border-none rounded-full bg-purple-400 text-center text-white text-xs font-semibold tracking-wide w-fit whitespace-nowrap">
                        02-SIMPLE BUDGET
                    </p>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 leading-tight">
                            Simple budgets
                        </h3>
                        <p className="text-stone-500 font-medium text-sm sm:text-base">
                            Set a daily, weekly or monthly limit. See if you're on track without spreadsheets.
                        </p>
                    </div>
                </div>

                {/* Dashboard UI Card Wrapper - Reconfigured to never break, clip, or wrap weirdly */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="shadow-lg flex flex-col gap-4 p-5 sm:p-6 border-none rounded-[2rem] bg-[#FFFBF4] w-full max-w-[340px] hover:shadow-xl transition-all duration-300 cursor-pointer">
                        
                        {/* Row A: SVG Circle and Progress Lines */}
                        <div className="shadow-sm flex flex-row justify-between items-center border-none rounded-2xl bg-white p-4 gap-4">
                            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center flex-shrink-0">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#EAE4D9" strokeWidth="4.5" />
                                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#9FD1C3" strokeWidth="4.5" strokeDasharray="40 100" strokeDashoffset="0" />
                                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#FF6B4A" strokeWidth="4.5" strokeDasharray="35 100" strokeDashoffset="-40" />
                                </svg>
                            </div>
                            <div className="flex-1 flex flex-col gap-2.5">
                                <div className="w-full bg-orange-100/40 h-2 rounded-full overflow-hidden">
                                    <div className="bg-[#FF6B4A] h-full rounded-full w-[85%]"></div>
                                </div>
                                <div className="w-full bg-blue-100/40 h-2 rounded-full overflow-hidden">
                                    <div className="bg-blue-400 h-full rounded-full w-[65%]"></div>
                                </div>
                                <div className="w-full bg-emerald-100/40 h-2 rounded-full overflow-hidden">
                                    <div className="bg-[#9FD1C3] h-full rounded-full w-[45%]"></div>
                                </div>
                                <div>
                                    <span className="absolute text-[9px] font-bold text-stone-400 text-center leading-tight">no red alarms</span>
                                </div>
                            </div>
                        </div>

                        {/* Row B: Daily Budget Stats Area */}
                        <div className="shadow-sm flex flex-row justify-between gap-4 p-4 border-none rounded-2xl bg-white items-center">
                            <div className="flex flex-col gap-0.5">
                                <p className="text-xs font-bold text-stone-400">Daily Budget</p>
                                <div className="flex flex-row items-baseline gap-1">
                                    <p className="text-xl sm:text-2xl font-extrabold text-stone-800">$32</p>
                                    <p className="text-[11px] font-semibold text-stone-400"> of $50 spent</p>
                                </div>   
                            </div>
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-[conic-gradient(#FF6B4A_65%,#f3f4f6_0)]">
                                    <div className="w-[84%] h-[84%] rounded-full bg-white flex items-center justify-center">
                                        <span className="text-xs font-extrabold text-[#FF6B4A]">65%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Row C: Status Confirmation Bar */}
                        <div className="shadow-sm p-3.5 flex flex-row gap-4 border-none rounded-2xl bg-white items-center">
                            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-[#FF6B4A] flex-shrink-0">
                                <svg xmlns="http://w3.org" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="leading-tight">
                                <p className="text-xs font-extrabold text-stone-800 flex items-center gap-1">On track ✨</p>
                                <p className="text-[11px] font-semibold text-stone-400 mt-0.5">No scary alerts</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* BLOCK 3: AUTO-CATCH SPENDING */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                <div className="flex flex-col gap-4 w-full lg:w-1/2">
                    {/* Badge layout with embedded dynamic inner text string elements */}
                    <div className="flex flex-row items-center gap-2 p-1 border-none rounded-full bg-purple-400 w-fit pr-2">
                        <span className="text-white text-xs font-semibold tracking-wide pl-3 py-0.5">03-AUTO-CATCH SPENDING</span>
                        <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2.5 py-0.5 rounded-full tracking-wider">COMING SOON</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 leading-tight">
                            Auto-catch spending
                        </h3>
                        <p className="text-stone-500 font-medium text-sm sm:text-base">
                            Connect your bank once. Every transaction records itself. Zero effort.
                        </p>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 max-w-[480px] aspect-square rounded-2xl overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <img src={Img8} alt="Auto-catch features overview screen mockup" className="w-full h-full object-cover" />
                </div>
            </div>
            <hr className="border-white/40 mt-4"/>
        </section>
        
    )
}
