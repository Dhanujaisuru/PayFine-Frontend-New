import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

function Hero() {
    const [fineId, setFineId] = useState("");

    const handleSearch = () => {
        if (!fineId.trim()) {
            toast.error("No data");
            setFineId("");
            return;
        }

        const fineIdPattern = /^F-\d{6}$/;
        if (!fineIdPattern.test(fineId)) {
            toast.error("Invalid format");
            setFineId("");
            return;
        }
    };

    return (
        <section className="flex items-center justify-center mb-60 px-8 py-16 mx-16 text-center max-sm:mt-10 max-sm:mb-40 max-sm:px-4 max-sm:mx-4 max-sm:py-12">
            <div className="mt-20 relative z-10 flex flex-col items-center justify-center text-white px-4 max-sm:px-2">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight max-sm:text-3xl">
                    Pay Your Traffic Fines <br className="max-sm:hidden" /> Online
                </h1>
                <p className="text-sm font-semibold mt-2 max-w-md max-sm:max-w-xs">
                    Quick, secure, and convenient way to manage traffic violations...
                </p>

                {/* Search Box */}
                <div className="mt-6 w-full max-sm:mt-4">
                    <div className="relative flex items-center bg-white rounded-2xl shadow-md max-sm:rounded-xl">
                        <input
                            type="text"
                            placeholder="Enter your fine reference number (F-123456)"
                            className="w-full p-4 pl-5 rounded-2xl text-black focus:outline-none max-sm:p-3 max-sm:pl-4 max-sm:rounded-xl"
                            value={fineId}
                            onChange={(e) => setFineId(e.target.value)}
                        />
                        <Button 
                            onClick={handleSearch} 
                            className="absolute right-2 bg-black text-white px-5 py-3 rounded-2xl hover:bg-gray-800 transition flex items-center gap-2 max-sm:px-4 max-sm:py-2 max-sm:rounded-xl"
                        >
                            <Search size={18} /> Search
                        </Button>
                    </div>
                </div>
                <Toaster />
            </div>
        </section>
    );
}

export default Hero;