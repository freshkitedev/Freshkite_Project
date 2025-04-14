import LoginModal from "../components/auth/loginModel";
import Navbar from "../components/common/navbar";
import {HeroSection} from "../components/specific/HeroSection";



export default function Home() {
  return (
    <div className="">
      <Navbar />
      <div>
        <HeroSection />  
        <LoginModal />
        
      </div>
    </div>
  );
}
