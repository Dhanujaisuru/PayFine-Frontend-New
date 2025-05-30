import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import driverData from "@/lib/mockdata/driver.js";

function DriverFinePage() {
  const fines = driverData.fines;
  const totalUnpaid = fines.filter((fine) => fine.status === "unpaid").reduce((total, fine) => total + fine.amount, 0);
  const totalPaid = fines.filter((fine) => fine.status === "paid").reduce((total, fine) => total + fine.amount, 0);

  return (
    <div className="flex flex-col gap-6 w-full p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Fines</h1>
        <p className="text-muted-foreground">View and manage all your traffic and parking fines.</p>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Fine Summary</CardTitle>
          <CardDescription>Overview of your current fine status</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-3 w-full">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium text-muted-foreground">Total Unpaid</h3>
            <p className="text-2xl font-bold text-red-600">${totalUnpaid.toFixed(2)}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium text-muted-foreground">Total Paid (2023)</h3>
            <p className="text-2xl font-bold">${totalPaid.toFixed(2)}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium text-muted-foreground">Points Accumulated</h3>
            <p className="text-2xl font-bold">{driverData.points}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-semibold">Fine History</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search fines..." className="w-full rounded-md pl-8 md:w-[300px]" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">All Fines</TabsTrigger>
            <TabsTrigger value="unpaid" className="flex-1">Unpaid</TabsTrigger>
            <TabsTrigger value="paid" className="flex-1">Paid</TabsTrigger>
            <TabsTrigger value="appealed" className="flex-1">Appealed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="border rounded-md mt-6 w-full">
            <div className="overflow-x-auto w-full">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">Citation #</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Violation</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Location</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fines.map((fine) => (
                    <tr key={fine.id} className="border-b">
                      <td className="px-4 py-3 text-sm">{fine.citationNumber}</td>
                      <td className="px-4 py-3 text-sm">{fine.date}</td>
                      <td className="px-4 py-3 text-sm">{fine.violation}</td>
                      <td className="px-4 py-3 text-sm">{/* Location not in mock data */}</td>
                      <td className="px-4 py-3 text-sm">${fine.amount.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm">
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
                          {fine.status === "paid" ? "Paid" : fine.status === "appealed" ? "Under Appeal" : "Unpaid"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          {fine.status === "unpaid" && (
                            <>
                              <Button variant="outline" size="sm">Pay Now</Button>
                              <Button variant="outline" size="sm">Appeal</Button>
                            </>
                          )}
                          {fine.status === "appealed" && (
                            <Button variant="outline" size="sm">View Appeal</Button>
                          )}
                          {fine.status === "paid" && (
                            <Button variant="outline" size="sm">View Details</Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between p-4 w-full">
              <div className="text-sm text-muted-foreground">Showing {fines.length} of {fines.length} fines</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled={fines.length < 10}>Next</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default DriverFinePage;