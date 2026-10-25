// import heroImg from './assets/hero.png'
import heroVid from '../assets/videos/herVid.mp4'
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <>
    <section className="relative h-[90vh] w-[100vw] overflow-hidden bg-cover flex items-center justify-center">
      <video src={heroVid} autoPlay muted loop className="absolute inset-0 -z-0 h-full w-full object-cover"/>
      <div className="absolute inset-0 -z-0 bg-gradient-to-b from-[#FF6B4A]/85 to-[#000]/65"></div>
      <div className="flex flex-col gap-20 z-20 text-center">
        <div className="font-bold text-[#2B2B2B] text-4xl  ">
          <p> Track your spending without the stress.</p>
        </div>
        <div className="flex flex-col gap-40 items-center text-[#FFF] text-2xl"> 
          <p> Log an expense in seconds. <br/>See exactly where your money goes. <br/>Finally stick with it.</p>
          <Link to="/register" className="animate-bounce shadow-lg w-45 h-15 content-center text-center border-none rounded-full text-[25px] text-white bg-[#FF6B4A] font-bold rounded-full hover:bg-[#E85A3A] ease-in-out">Get Started →</Link>
        </div>
      </div>
    </section>
    </>
  )
} 

// const Button = () => {
//   return (
//     <div>
//       <button>Click Me</button>
//     </div>
//   )
// }

export default HeroSection;