
import FAQSection from "@/components/shared/FAQSection";
import Features from "@/components/shared/Features";
import Footer from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { Hero } from "@/components/shared/Hero";
import HowItWork from "@/components/shared/HowItWork";






export default function Home() {
  return (
    <div className=" relative h-full">
    <Header/>
    <Hero/>
    <Features/>
    <HowItWork/>
    <FAQSection/>
    <Footer/>
    


    

</div>
 
  );
}
