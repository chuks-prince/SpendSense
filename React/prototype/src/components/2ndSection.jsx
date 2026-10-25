import Img1 from '../assets/images/Img1.jpg'
import Img2 from '../assets/images/Img2.jpg'
import Img3 from '../assets/images/Img3.jpg'

export default function Section2() {
  return (
    <section className="flex flex-col min-h-screen gap-12 md:gap-16 py-12 md:py-20 max-w-7xl mx-auto">
      {/* Top Heading Content */}
      <div className="flex flex-col gap-6 px-6 md:px-12 max-w-4xl">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#000] leading-tight">
          You're not bad with money.<br className="hidden sm:inline"/> You just don't have a system.
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl text-[#2B2B2B] leading-relaxed font-medium">
          Most people don't track their expenses — not because they don't care, but because every tool feels like work. 
          <br className="hidden lg:inline"/> So the money disappears, and you're left wondering where it went.
        </p>
      </div>     
      
      {/* Mobile: Stacks vertically | Medium screens: 3-column layout grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 px-6 md:px-12 w-full justify-items-center">
        
        {/* Card 1 */}
        <div className="w-full max-w-sm rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
          <img src={Img1} alt="Dashboard UI preview 1" className="w-full h-auto object-cover"/>
        </div>
        
        {/* Card 2 */}
        <div className="w-full max-w-sm rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
          <img src={Img2} alt="Dashboard UI preview 2" className="w-full h-auto object-cover"/>
        </div>
        
        {/* Card 3 */}
        <div className="w-full max-w-sm rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
          <img src={Img3} alt="Dashboard UI preview 3" className="w-full h-auto object-cover"/>
        </div>

      </div>
    </section>
  );
}
