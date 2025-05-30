import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";

function FeatureCard({ title, description, icon: Icon, iconBgColor = "bg-primary", iconColor = "text-primary" }) {
  return (
    <div className="w-full px-4 py-4 sm:mx-4 sm:py-0">
      <Card className="w-full max-w-sm p-6 border rounded-xl shadow-md hover:shadow-lg transition h-[300px] flex flex-col justify-between">
        <CardHeader className="flex flex-col items-start text-left">
          <div className={`p-3 rounded-lg bg-opacity-10 ${iconBgColor} ${iconColor}`}>
            <Icon size={32} />
          </div>
          <CardTitle className="mt-2">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-left min-h-[100px]">
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <CardFooter className="text-left">
          <div>
            <a href="#" className="text-purple-600 text-sm hover:font-bold">
              Learn more...
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default FeatureCard;