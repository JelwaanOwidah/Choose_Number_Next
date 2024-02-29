import "./page.css";
import HeaderComp from "@/componants/Header";
import MainComp from "@/componants/Main";
import AdSense from "@/componants/AdSense";

const Home = () => {
  return (
    <>
    
      <AdSense adSlot = "8014655531" />
      <HeaderComp/>
      <MainComp/>
      
    </>
  );
}

export default Home ; 