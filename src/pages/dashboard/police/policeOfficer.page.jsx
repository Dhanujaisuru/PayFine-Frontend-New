import { useState } from "react";
import policeData from "@/lib/mockdata/police.js";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowRight, FileText, User } from "lucide-react";
import { Link } from "react-router";

function PoliceDashboard() {
  const {
    officerID,
    fullName,
    department,
    citationsIssued,
    totalCitations,
    totalRevenue,
  } = policeData;

  const [activeTab, setActiveTab] = useState("recent-citations");

  // Calculate dynamic values
  const unpaidCitations = citationsIssued.filter(
    (citation) => citation.status === "unpaid"
  );
  const totalUnpaidAmount = unpaidCitations.reduce(
    (total, citation) => total + citation.amount,
    0
  );

  return (
    <div className="flex flex-col gap-6 w-full p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Police Dashboard</h1>
        </div>
        <p className="text-muted-foreground">
          Welcome back, {fullName} ({officerID}). Manage citations for {department}.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Citations Issued</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCitations}</div>
            <p className="text-xs text-muted-foreground">
              {unpaidCitations.length} unpaid
            </p>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              ${totalUnpaidAmount.toFixed(2)} unpaid
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Citations */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="recent-citations" className="flex-1">
            Recent Citations
          </TabsTrigger>
        </TabsList>

        {/* Recent Citations Table */}
        <TabsContent value="recent-citations" className="border rounded-md mt-6 w-full">
          <div className="overflow-x-auto w-full">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Date</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Violation</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {citationsIssued.slice(0, 3).map((citation) => (
                  <TableRow key={citation.id}>
                    <TableCell>{citation.date}</TableCell>
                    <TableCell>{citation.driver}</TableCell>
                    <TableCell>{citation.violation}</TableCell>
                    <TableCell>${citation.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          citation.status === "paid"
                            ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                            : citation.status === "appealed"
                              ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-700"
                              : "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
                        }
                      >
                        {citation.status === "paid"
                          ? "Paid"
                          : citation.status === "appealed"
                            ? "Under Appeal"
                            : "Unpaid"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/admin/citation?citation=${citation.citationNumber}`}>
                          View Details
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* <div className="flex items-center justify-end p-4 w-full">
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/admin/citations">
                View All Citations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PoliceDashboard;