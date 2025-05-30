import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, FileText, AlertCircle } from "lucide-react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

// Define validation schema using Zod
const fineSchema = zod.object({
  driverName: zod.string().min(1, "Driver name is required"),
  licenseNumber: zod.string().min(1, "License number is required"),
  violation: zod.string().min(1, "Violation type is required"),
  amount: zod
    .number()
    .min(10, "Fine amount must be at least $10")
    .max(1000, "Fine amount cannot exceed $1000"),
  date: zod.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  description: zod.string().optional(),
});

function IssueFinePage() {
  const [submitStatus, setSubmitStatus] = useState(null);

  // Initialize form with react-hook-form and Zod
  const form = useForm({
    resolver: zodResolver(fineSchema),
    defaultValues: {
      driverName: "",
      licenseNumber: "",
      violation: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0], // Default to today's date
      description: "",
    },
  });

  // Mock violation types (could be from mockdata)
  const violationTypes = [
    { value: "speeding", label: "Speeding" },
    { value: "red_light", label: "Red Light Violation" },
    { value: "parking", label: "Parking Violation" },
    { value: "reckless_driving", label: "Reckless Driving" },
  ];

  // Handle form submission
  const onSubmit = (data) => {
    // Simulate API call to issue fine
    console.log("Issuing fine:", data);
    setSubmitStatus({
      type: "success",
      message: `Fine issued successfully for ${data.driverName} (Citation #CIT${Math.floor(
        Math.random() * 10000
      )})`,
    });
    form.reset();
  };

  return (
    <div className="flex flex-col gap-6 w-full p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Issue New Fine</h1>
        </div>
        <p className="text-muted-foreground">
          Enter the details below to issue a new fine to a driver.
        </p>
      </div>

      {/* Submission Status Alert */}
      {submitStatus && (
        <Alert
          variant={submitStatus.type === "success" ? "default" : "destructive"}
          className="w-full"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>
            {submitStatus.type === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>{submitStatus.message}</AlertDescription>
        </Alert>
      )}

      {/* Form and Summary Card */}
      <div className="grid w-full gap-6 md:grid-cols-3">
        {/* Fine Issuance Form */}
        <Card className="md:col-span-2 w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Fine Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="driverName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driver Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter driver name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driver License Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter license number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="violation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Violation Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select violation type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {violationTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fine Amount ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter fine amount"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Violation</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter additional details" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <Button type="submit">Issue Fine</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                  >
                    Reset Form
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Driver Name</p>
                <p className="text-muted-foreground">
                  {form.watch("driverName") || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">License Number</p>
                <p className="text-muted-foreground">
                  {form.watch("licenseNumber") || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Violation</p>
                <p className="text-muted-foreground">
                  {violationTypes.find((v) => v.value === form.watch("violation"))
                    ?.label || "Not selected"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Amount</p>
                <p className="text-muted-foreground">
                  ${form.watch("amount")?.toFixed(2) || "0.00"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Date</p>
                <p className="text-muted-foreground">
                  {form.watch("date") || "Not provided"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default IssueFinePage;