import { useState } from "react";
import driverData from "@/lib/mockdata/driver.js";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AlertCircle, ArrowRight, Car, CreditCard, FileText } from "lucide-react";
import { Link } from "react-router";

function DriverDashboard() {
  const {
    name,
    points,
    maxPoints,
    licenseStatus,
    licenseExpiryDays,
    fines,
    appeals,
  } = driverData;

  const [activeTab, setActiveTab] = useState("recent-fines");

  // Calculate dynamic values similar to DashboardPage
  const unpaidFines = fines.filter((fine) => fine.status === "unpaid");
  const totalFineAmount = fines.reduce((total, fine) => total + fine.amount, 0);
  const unpaidAmount = unpaidFines.reduce((total, fine) => total + fine.amount, 0);
  const pendingAppeals = appeals.filter((appeal) => appeal.status === "in_review");

  return (
    <div className="flex flex-col gap-6 w-full p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {name}. Here's an overview of your driving record.
        </p>
      </div>

      {/* Notice Banner */}
      {unpaidFines.length > 0 && (
        <Alert variant="destructive" className="w-full">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important Notice</AlertTitle>
          <AlertDescription>
            You have {unpaidFines.length} unpaid{" "}
            {unpaidFines.length === 1 ? "fine" : "fines"} totaling $
            {unpaidAmount.toFixed(2)}. Please make a payment to avoid additional
            penalties.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Fines</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalFineAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {unpaidFines.length} unpaid fines
            </p>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Appeals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAppeals.length}</div>
            <p className="text-xs text-muted-foreground">
              {pendingAppeals.length} appeal
              {pendingAppeals.length !== 1 ? "s" : ""} in review
            </p>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Points</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {points}/{maxPoints}
            </div>
            <Progress
              value={(points / maxPoints) * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">License Status</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
              >
                {licenseStatus}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Expires in {licenseExpiryDays} days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Fines and Appeals */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="recent-fines" className="flex-1">
            Recent Fines
          </TabsTrigger>
          <TabsTrigger value="appeal-status" className="flex-1">
            Appeal Status
          </TabsTrigger>
        </TabsList>

        {/* Recent Fines Table */}
        <TabsContent value="recent-fines" className="border rounded-md mt-6 w-full">
          <div className="overflow-x-auto w-full">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Date</TableHead>
                  <TableHead>Violation</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fines.slice(0, 3).map((fine) => (
                  <TableRow key={fine.id}>
                    <TableCell>{fine.date}</TableCell>
                    <TableCell>{fine.violation}</TableCell>
                    <TableCell>${fine.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          fine.status === "paid"
                            ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                            : fine.status === "appealed"
                              ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-700"
                              : "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
                        }
                      >
                        {fine.status === "paid"
                          ? "Paid"
                          : fine.status === "appealed"
                            ? "Under Appeal"
                            : "Unpaid"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {fine.status === "unpaid" ? (
                        <Button variant="outline" size="sm">
                          Pay Fine
                        </Button>
                      ) : fine.status === "appealed" ? (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/appeals?citation=${fine.citationNumber}`}>
                            View Appeal
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/driver/fine?citation=${fine.citationNumber}`}>
                            View Details
                          </Link>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end p-4 w-full">
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/driver/fine">
                View All Fines
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>

        {/* Appeal Status Table */}
        <TabsContent value="appeal-status" className="border rounded-md mt-6 w-full">
          <div className="overflow-x-auto w-full">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Appeal ID</TableHead>
                  <TableHead>Date Filed</TableHead>
                  <TableHead>Violation</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appeals.slice(0, 3).map((appeal) => (
                  <TableRow key={appeal.id}>
                    <TableCell>{appeal.appealId}</TableCell>
                    <TableCell>{appeal.dateFiled}</TableCell>
                    <TableCell>{appeal.violation}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          appeal.status === "approved"
                            ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                            : appeal.status === "in_review"
                              ? "bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700"
                              : "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
                        }
                      >
                        {appeal.status === "approved"
                          ? "Approved"
                          : appeal.status === "in_review"
                            ? "In Review"
                            : "Rejected"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/driver/appeal?id=${appeal.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end p-4 w-full">
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/driver/appeal">
                View All Appeals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DriverDashboard;