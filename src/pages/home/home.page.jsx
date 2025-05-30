import Navigation from "@/components/Navigation";
import Hero from "./components/hero";
import FeatureSection from "./components/featureSection";
import HomeBG from "@/assets/images/traffic.jpg";
import StatusSection from "./components/statusSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/chatbot/ai-chat-bot";

function HomePage() {
  return (
    <main className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${HomeBG})` }}>
      <Hero />
      <FeatureSection />
      <StatusSection />
      <Footer/>
      <Chatbot />
    </main>
  );
}

export default HomePage;