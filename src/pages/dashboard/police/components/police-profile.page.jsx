import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import policeData from "@/lib/mockdata/police.js";

function PoliceProfilePage() {
  const today = new Date("2025-05-30T20:05:00+0530"); // Match DriverProfilePage date
  const timeDiff = new Date(policeData.badgeExpireDate) - today;
  const daysUntilExpiry = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return (
    <div className="flex flex-col gap-6 w-full p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Officer Profile</h1>
        </div>
        <p className="text-muted-foreground">View and manage your officer profile details.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Details from your officer record</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Full Name</p>
              <p className="text-lg">{policeData.fullName}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
              <p className="text-lg">{new Date(policeData.dateOfBirth).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Gender</p>
              <p className="text-lg capitalize">{policeData.gender}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
              <p className="text-lg">{policeData.phoneNumber || "Not specified"}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Address</p>
              <p className="text-lg">{policeData.address || "Not specified"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Officer Information Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Officer Information</CardTitle>
            <CardDescription>Details about your officer credentials</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Officer ID</p>
              <p className="text-lg">{policeData.officerID}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Police Station ID</p>
              <p className="text-lg">{policeData.policeStationID}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Department</p>
              <p className="text-lg">{policeData.department}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Badge Issue Date</p>
              <p className="text-lg">{new Date(policeData.badgeIssueDate).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">Badge Expiry Date</p>
              <div className="flex items-center gap-2">
                <p className="text-lg">{new Date(policeData.badgeExpireDate).toLocaleDateString()}</p>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-700">
                  {daysUntilExpiry} days remaining
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Button (Commented Out to Match DriverProfilePage) */}
      {/* <div className="flex justify-end">
        <Button>Edit Profile</Button>
      </div> */}
    </div>
  );
}

export default PoliceProfilePage;