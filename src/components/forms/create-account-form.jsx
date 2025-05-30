import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle2, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import DriverImg from "@/assets/images/driver.png";
import PoliceImg from "@/assets/images/police-officer.png";

// Define the form schemas for each user type
const userTypeSchema = z.object({
  userType: z.enum(["driver", "police"], {
    required_error: "Please select a user type",
  }),
})

const driverSchema = z.object({
  licenseNumber: z.string().min(1, "License number is required"),
  idNumber: z.string().min(1, "ID number is required"),
  fullNameOnLicense: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  bloodGroup: z.string().optional(),
  restrictionCodes: z.string().optional(),
  addressOnLicense: z.string().optional(),
  licenseIssueDate: z.date({
    required_error: "License issue date is required",
  }),
  licenseExpireDate: z.date({
    required_error: "License expiry date is required",
  }),
  vehicleCategories: z.string().optional(),
  licensePhoto: z.string().optional(),
})

const policeSchema = z.object({
  officerID: z.string().min(1, "Officer ID is required"),
  policeStationID: z.string().min(1, "Police station ID is required"),
  fullName: z.string().optional(),
  phoneNumber: z.string().optional(),
  department: z.string().min(1, "Department is required"),
})

export function MultiStepForm({ onComplete }) {
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState(null)
  const [formData, setFormData] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const userTypeForm = useForm({
    resolver: zodResolver(userTypeSchema),
    defaultValues: {
      userType: undefined,
    },
  })

  const driverForm = useForm({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      licenseNumber: "",
      idNumber: "",
      fullNameOnLicense: "",
      phoneNumber: "",
      bloodGroup: "",
      restrictionCodes: "",
      addressOnLicense: "",
      vehicleCategories: "",
      licensePhoto: "",
    },
  })

  const policeForm = useForm({
    resolver: zodResolver(policeSchema),
    defaultValues: {
      officerID: "",
      policeStationID: "",
      fullName: "",
      phoneNumber: "",
      department: "",
    },
  })

  // Handle user type selection
  const onUserTypeSubmit = (data) => {
    setUserType(data.userType)
    setStep(2)
  }

  // Handle form submission for driver or police
  const onDetailsSubmit = (data) => {
    setFormData(data)
    setStep(3)
  }

  // Handle final confirmation
  const onConfirm = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setStep(4)
    // Here you would typically send the data to your backend
    console.log("Form submitted:", { userType, formData })

    // Call the onComplete callback if provided
    if (onComplete) {
      onComplete()
    }
  }

  // Reset the form
  const resetForm = () => {
    setStep(1)
    setUserType(null)
    setFormData(null)
    userTypeForm.reset()
    driverForm.reset()
    policeForm.reset()
  }

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-4 md:p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            {step === 1 && "Select User Type"}
            {step === 2 && (userType === "driver" ? "Driver Information" : "Police Information")}
            {step === 3 && "Confirm Your Details"}
            {step === 4 && "Registration Complete"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {step === 1 && "Please select whether you are registering as a driver or police officer."}
            {step === 2 && "Please fill in your details below. Fields marked with * are required."}
            {step === 3 && "Please review your information before submitting."}
            {step === 4 && "Your registration has been successfully completed."}
          </p>
        </div>

        {/* Step 1: User Type Selection */}
        {step === 1 && (
          <Form {...userTypeForm}>
            <form onSubmit={userTypeForm.handleSubmit(onUserTypeSubmit)} className="space-y-6">
              <FormField
                control={userTypeForm.control}
                name="userType"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-lg">I am a:</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Driver Card */}
                        <div
                          className={cn(
                            "relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:border-primary",
                            field.value === "driver" ? "border-primary bg-primary/5" : "border-muted",
                          )}
                          onClick={() => {
                            field.onChange("driver")
                          }}
                        >
                          <div className="flex flex-col items-center text-center">
                            <div className="mb-3 h-24 w-24 flex items-center justify-center">
                              <img
                                src={DriverImg}
                                alt="Driver"
                                className="h-full w-full object-contain"
                              />
                            </div>
                            <h3 className="font-medium text-lg">Driver</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Register as a driver to manage your license information
                            </p>
                            {field.value === "driver" && (
                              <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Police Card */}
                        <div
                          className={cn(
                            "relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:border-primary",
                            field.value === "police" ? "border-primary bg-primary/5" : "border-muted",
                          )}
                          onClick={() => {
                            field.onChange("police")
                          }}
                        >
                          <div className="flex flex-col items-center text-center">
                            <div className="mb-3 h-24 w-24 flex items-center justify-center">
                              <img
                                src={PoliceImg}
                                alt="Police Officer"
                                className="h-full w-full object-contain"
                              />
                            </div>
                            <h3 className="font-medium text-lg">Police Officer</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Register as law enforcement to verify licenses
                            </p>
                            {field.value === "police" && (
                              <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-6" disabled={!userTypeForm.watch("userType")}>
                Continue
              </Button>
            </form>
          </Form>
        )}

        {/* Step 2: Driver Form */}
        {step === 2 && userType === "driver" && (
          <Form {...driverForm}>
            <form onSubmit={driverForm.handleSubmit(onDetailsSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                <FormField
                  control={driverForm.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter license number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={driverForm.control}
                  name="idNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter ID number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={driverForm.control}
                  name="fullNameOnLicense"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name (as on license) *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={driverForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={driverForm.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start" style={{ width: '300px' }}>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                            className="rounded-md border"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={driverForm.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[var(--radix-select-content-available-height)] w-[300px]">
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={driverForm.control}
                  name="bloodGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Group</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter blood group" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={driverForm.control}
                  name="restrictionCodes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Restriction Codes</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select restriction codes" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[var(--radix-select-content-available-height)] w-[300px]">
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="A">A - Corrective Lenses</SelectItem>
                          <SelectItem value="B">B - Outside Mirrors</SelectItem>
                          <SelectItem value="C">C - Daylight Driving Only</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={driverForm.control}
                  name="addressOnLicense"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address (as on license)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={driverForm.control}
                  name="licenseIssueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>License Issue Date *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start" style={{ width: '300px' }}>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date()}
                            initialFocus
                            className="rounded-md border"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={driverForm.control}
                  name="licenseExpireDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>License Expiry Date *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start" style={{ width: '300px' }}>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="rounded-md border"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={driverForm.control}
                  name="vehicleCategories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Categories</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle categories" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[var(--radix-select-content-available-height)] w-[300px]">
                          <SelectItem value="A">A - Motorcycles</SelectItem>
                          <SelectItem value="B">B - Cars & Light Vehicles</SelectItem>
                          <SelectItem value="C">C - Commercial Vehicles</SelectItem>
                          <SelectItem value="D">D - Buses</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        )}

        {/* Step 2: Police Form */}
        {step === 2 && userType === "police" && (
          <Form {...policeForm}>
            <form onSubmit={policeForm.handleSubmit(onDetailsSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={policeForm.control}
                  name="officerID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Officer ID *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter officer ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={policeForm.control}
                  name="policeStationID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Police Station ID</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select police station" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[var(--radix-select-content-available-height)] w-[300px]">
                          <SelectItem value="PS001">PS001 - Central Station</SelectItem>
                          <SelectItem value="PS002">PS002 - North District</SelectItem>
                          <SelectItem value="PS003">PS003 - South District</SelectItem>
                          <SelectItem value="PS004">PS004 - East District</SelectItem>
                          <SelectItem value="PS005">PS005 - West District</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={policeForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={policeForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={policeForm.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter department" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && formData && (
          <div className="space-y-6">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">User Type</h3>
              <p className="text-sm">{userType === "driver" ? "Driver" : "Police Officer"}</p>
            </div>

            {userType === "driver" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">License Number</h3>
                    <p className="text-sm">{formData.licenseNumber}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">ID Number</h3>
                    <p className="text-sm">{formData.idNumber}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Full Name</h3>
                    <p className="text-sm">{formData.fullNameOnLicense}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Phone Number</h3>
                    <p className="text-sm">{formData.phoneNumber}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Date of Birth</h3>
                    <p className="text-sm">
                      {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Not provided"}
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Gender</h3>
                    <p className="text-sm">{formData.gender}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">License Issue Date</h3>
                    <p className="text-sm">
                      {formData.licenseIssueDate ? format(formData.licenseIssueDate, "PPP") : "Not provided"}
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">License Expiry Date</h3>
                    <p className="text-sm">
                      {formData.licenseExpireDate ? format(formData.licenseExpireDate, "PPP") : "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {userType === "police" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Officer ID</h3>
                    <p className="text-sm">{formData.officerID}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Police Station ID</h3>
                    <p className="text-sm">{formData.policeStationID}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Department</h3>
                    <p className="text-sm">{formData.department}</p>
                  </div>
                  {formData.fullName && (
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Full Name</h3>
                      <p className="text-sm">{formData.fullName}</p>
                    </div>
                  )}
                  {formData.phoneNumber && (
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Phone Number</h3>
                      <p className="text-sm">{formData.phoneNumber}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={onConfirm} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  "Confirm"
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <h3 className="text-xl font-medium">Registration Successful!</h3>
            <p className="text-muted-foreground">Your information has been successfully submitted.</p>
            <Button onClick={resetForm} className="mt-4">
              Register Another
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="text-sm text-muted-foreground">
            Step {step} of {userType ? 4 : 3}
          </div>
          <div className="flex space-x-2">
            <div className={`h-2 w-10 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
            <div className={`h-2 w-10 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
            <div className={`h-2 w-10 rounded-full ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
            {userType && <div className={`h-2 w-10 rounded-full ${step >= 4 ? "bg-primary" : "bg-muted"}`} />}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}