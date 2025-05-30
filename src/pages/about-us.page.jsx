import React from "react";
import HomeBG from "../assets/images/traffic.jpg";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Clock, Users, Award } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${HomeBG})` }}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-sm:text-3xl">About Us</h1>
          <p className="text-sm font-semibold mt-2 max-w-md max-sm:max-w-xs mx-auto">
            Simplifying traffic fine management for Drivers...
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Mission Statement */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Our Mission
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              Making Traffic Fine Payments Simple and Accessible
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are dedicated to providing citizens with a quick, secure, and convenient way to manage
              traffic violations online. Our platform eliminates the need for long queues and
              complicated paperwork, making the process as smooth as possible.
            </p>
          </div>

          {/* Values */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
            <Card>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Bank-level security ensures your personal and payment information is always protected.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Process payments in minutes, not hours. Available 24/7 for your convenience.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">User-Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Intuitive design makes it easy for everyone to navigate and complete payments.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Award className="h-12 w-12 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Trusted by thousands of citizens with a 99.9% uptime guarantee.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-16" />

          {/* Story */}
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                Our Story
              </Badge>
              <h3 className="text-2xl font-bold mb-6">
                Transforming Public Services Through Technology
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2020, our platform was born from the idea that paying traffic fines shouldn’t be frustrating.
                  We wanted a digital-first solution that respects citizens’ time and privacy.
                </p>
                <p>
                  Partnering with local authorities, we built a system that simplifies payments and ensures transparency.
                </p>
                <p>
                  Today, we serve over 100,000 citizens annually, processing millions in fines with top-tier security.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">100,000+</CardTitle>
                  <CardDescription>Citizens served annually</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">99.9%</CardTitle>
                  <CardDescription>System uptime reliability</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">24/7</CardTitle>
                  <CardDescription>Available around the clock</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          <Separator className="my-16" />

          {/* Contact */}
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Get in Touch
            </Badge>
            <h3 className="text-2xl font-bold mb-6">Questions? We're Here to Help</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our customer support team is ready to assist with any inquiries about your traffic fines or our platform.
            </p>
            <div className="grid gap-4 md:grid-cols-3 max-w-2xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Email Support</CardTitle>
                  <CardDescription>support@payfine.gov</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Phone Support</CardTitle>
                  <CardDescription>+94-410-000-1234</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Live Chat</CardTitle>
                  <CardDescription>Available 9 AM - 6 PM</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
