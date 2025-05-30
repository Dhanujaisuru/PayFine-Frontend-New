import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import driverData from "@/lib/mockdata/driver.js";

function DriverProfilePage() {
  const profile = driverData.driverProfile;
  const today = new Date("2025-05-30T20:05:00+0530"); // Current date and time
  const timeDiff = new Date(profile.licenseExpireDate) - today;
  const daysUntilExpiry = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return (
    <div className="flex flex-col gap-6 w-full p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Driver Profile</h1>
        <p className="text-muted-foreground">View and manage your driver profile details.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Details from your driver's license</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Full Name</p>
              <p className="text-lg">{profile.fullNameOnLicense}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
              <p className="text-lg">{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Gender</p>
              <p className="text-lg capitalize">{profile.gender}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Blood Group</p>
              <p className="text-lg">{profile.bloodGroup || "Not specified"}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
              <p className="text-lg">{profile.phoneNumber}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Address</p>
              <p className="text-lg">{profile.addressOnLicense || "Not specified"}</p>
            </div>
          </CardContent>
        </Card>

        {/* License Information Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>License Information</CardTitle>
            <CardDescription>Details about your driver's license</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">License Number</p>
              <p className="text-lg">{profile.licenseNumber}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">ID Number</p>
              <p className="text-lg">{profile.idNumber}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Issue Date</p>
              <p className="text-lg">{new Date(profile.licenseIssueDate).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Expiry Date</p>
              <div className="flex items-center gap-2">
                <p className="text-lg">{new Date(profile.licenseExpireDate).toLocaleDateString()}</p>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-700">
                  {daysUntilExpiry} days remaining
                </Badge>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Vehicle Categories</p>
              <p className="text-lg">{profile.vehicleCategories || "Not specified"}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Restriction Codes</p>
              <p className="text-lg">{profile.restrictionCodes || "Not specified"}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Points Accumulated</p>
              <p className="text-lg">{driverData.points}/{driverData.maxPoints}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">License Status</p>
              <Badge
                variant="outline"
                className={
                  driverData.licenseStatus === "Active"
                    ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                    : "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
                }
              >
                {driverData.licenseStatus}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Button */}
      {/* <div className="flex justify-end">
        <Button>Edit Profile</Button>
      </div> */}
    </div>
  );
}

export default DriverProfilePage;