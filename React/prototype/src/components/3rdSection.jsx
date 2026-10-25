import Img4 from '../assets/images/Img4.jpg'
import Img5 from '../assets/images/Img5.jpg'
import Img6 from '../assets/images/Img6.jpg'

export const Section3 = () => {
    return (
        <section className="flex flex-col gap-12 md:gap-20 py-16 md:py-24 bg-gray-300 shadow-lg px-6 md:px-10 max-w-7xl mx-auto rounded-[2.5rem]">
            {/* Header Text Group - Text scales fluidly based on screen size */}
            <div className="flex flex-col gap-4 md:gap-5 items-center text-center max-w-3xl mx-auto">
                <h2 className="font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-stone-900">
                    TRACKING MADE SIMPLE
                </h2>
                <p className="text-xl sm:text-2xl lg:text-3xl text-[#2B2B2B] font-medium leading-relaxed">
                    Track your expenses in just a few steps
                </p>
            </div>

            {/* Responsive Image Grid Layout */}
            {/* Stacks 1 column on mobile, changes to 3 columns on medium (md) viewports */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full justify-items-center">
                
                {/* Card 1 */}
                <div className="w-full max-w-sm rounded-3xl overflow-hidden border-none bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                    <img src={ Img4 } alt="Tracking step 1" className="w-full h-auto object-cover" />
                </div>
                
                {/* Card 2 */}
                <div className="w-full max-w-sm rounded-3xl overflow-hidden border-none bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                    <img src={ Img5 } alt="Tracking step 2" className="w-full h-auto object-cover" />
                </div>
                
                {/* Card 3 */}
                <div className="w-full max-w-sm rounded-3xl overflow-hidden border-none bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                    <img src={ Img6 } alt="Tracking step 3" className="w-full h-auto object-cover" />
                </div>

            </div>
            
            <hr className="border-white/40 mt-4"/>
        </section>
    )
}
