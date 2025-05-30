import React from "react";
import HomeBG from "../assets/images/traffic.jpg";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function ViewMap() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="h-[400px] bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-4"
        style={{ backgroundImage: `url(${HomeBG})` }}
      >
        <div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-sm:text-3xl">
            View Map
          </h1>
          <p className="text-sm font-semibold mt-2 max-w-md max-sm:max-w-xs mx-auto">
            Locate nearby traffic offices and support centers easily.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="min-h-screen bg-background py-16 px-4 flex justify-center">
        <div className="max-w-4xl w-full">
          <Badge variant="secondary" className="mb-4 mx-auto text-center block">
            Interactive Map
          </Badge>
          <h2 className="text-3xl font-bold mb-6 text-center">Find Us on the Map</h2>
          <p className="text-muted-foreground mb-10 text-center">
            Use the map below to locate traffic department branches, authorized payment centers, and more.
          </p>

          <Card>
            <CardContent>
              <div className="rounded-lg overflow-hidden shadow-lg aspect-video">
                <iframe
                  title="Central Traffic Office"
                  src="https://www.google.com/maps/d/embed?mid=1hVtLZE2LZSt1X27vRk3ZZjHA-QCmwCc"
                  width="100%"
                  height="450"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                ></iframe>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-12" />

          <div className="text-center text-sm text-muted-foreground">
            Need directions? Use Google Maps on your phone for step-by-step guidance.
          </div>
        </div>
      </section>
    </>
  );
}

export default ViewMap;
