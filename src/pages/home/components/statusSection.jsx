import { Button } from "@/components/ui/button";
import BGImage from "@/assets/images/speedometer.jpg";
import { Link } from "react-router";

function StatusSection() {
    return (
        <section className="relative h-[500px] sm:h-[650px] w-full overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${BGImage})` }}
                />
            </div>

            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 h-full flex items-center">
                <div className="ml-4 md:ml-8 lg:ml-12 max-w-3xl px-4 sm:px-6">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-snug">
                        Driver License Status <br className="hidden sm:block" />
                        Monitoring
                    </h1>

                    <p className="mt-3 sm:mt-4 text-sm text-white/90 md:text-base max-w-2xl leading-loose">
                        Easily track and manage driver penalty points with our efficient <br className="hidden sm:block" />
                        and user-friendly system. Stay informed, stay safe, and stay on <br className="hidden sm:block" /> the road...!
                    </p>

                    <div className="mt-6 sm:mt-8 flex flex-wrap gap-4 sm:gap-8 md:gap-12">
                        <Button
                            className="bg-white text-black hover:bg-white/90 transition-colors px-6 sm:px-8"
                            size="lg"
                            style={{ border: '2px solid #ffffff' }}
                        >
                            Check Point Balance
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-transparent text-white border-white hover:bg-white/10 hover:text-white"
                            size="lg"
                            style={{ border: '2px solid #ffffff' }}
                        >
                            <Link to="/points">Learn More...</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default StatusSection;