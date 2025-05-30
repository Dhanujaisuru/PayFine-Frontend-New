import FeatureCard from "./featureCard";
import { CreditCard, Bell, Headset, FileText } from "lucide-react";

const features = [
  {
    title: "Instant Fine Payments",
    description: "Pay your fines instantly using multiple payment methods, including credit cards and bank transfers.",
    icon: CreditCard,
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-500",
  },
  {
    title: "Smart Notifications",
    description: "Receive real-time updates on your fines and payment status via SMS and email.",
    icon: Bell,
    iconBgColor: "bg-green-100",
    iconColor: "text-green-500",
  },
  {
    title: "24/7 Assistance",
    description: "Get support anytime through our AI chatbot or by contacting our dedicated support team.",
    icon: Headset,
    iconBgColor: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    title: "Fine Appeals",
    description: "Easily submit and track fine appeals directly through our platform.",
    icon: FileText,
    iconBgColor: "bg-red-100",
    iconColor: "text-red-500",
  },
];

function FeatureSection() {
  return (
    <section className="py-12 sm:py-16 bg-white text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Your Fines, Our Solutions...
        </h2>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          We make it easy for drivers to use our platform, that's why we provide this benefit.
        </p>
      </div>

      {/* Feature Cards Grid - Made responsive without changing any existing styles */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 sm:mt-10 px-4 sm:px-6 md:px-12">
        {features.map((feature, index) => (
          <div key={index} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
            <FeatureCard 
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              iconBgColor={feature.iconBgColor}
              iconColor={feature.iconColor}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureSection;