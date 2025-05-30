import React from "react";
import HomeBG from "../assets/images/traffic.jpg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    reset();
  };

  return (
    <>
      <section
        className="h-[400px] bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-4"
        style={{ backgroundImage: `url(${HomeBG})` }}
      >
        <div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-sm:text-3xl">
            Contact Us
          </h1>
          <p className="text-sm font-semibold mt-2 max-w-md max-sm:max-w-xs mx-auto">
            Simplifying traffic fine management for Drivers...
          </p>
        </div>
      </section>

      <section className="min-h-screen bg-background py-16 px-4 flex justify-center">
        <div className="max-w-2xl w-full">
          <Badge variant="secondary" className="mb-4 mx-auto text-center block">
            Get in Touch
          </Badge>
          <h2 className="text-3xl font-bold mb-6 text-center">
            We'd Love to Hear from You
          </h2>
          <p className="text-muted-foreground mb-10 text-center">
            Have a question or feedback? Fill out the form below and we'll get back to you shortly.
          </p>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={5} {...register("message")} />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                {isSubmitSuccessful && (
                  <p className="text-green-600 text-sm text-center mt-4">
                    Your message has been sent!
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
