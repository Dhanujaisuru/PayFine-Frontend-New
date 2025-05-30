import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import driverData from "@/lib/mockdata/driver.js";

function FineAppealPage() {
    const appeals = driverData.appeals;

    return (
        <div className="flex flex-col gap-6 w-full p-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Appeals</h1>
                <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">Manage your fine appeals and check their status.</p>
                    <Button>+ New Appeal</Button>
                </div>
            </div>

            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Appeal Summary</CardTitle>
                    <CardDescription>Overview of your appeals</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 sm:grid-cols-4 w-full">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Appeals</h3>
                        <p className="text-2xl font-bold">{appeals.length}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-medium text-muted-foreground">In Review</h3>
                        <p className="text-2xl font-bold">1</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-medium text-muted-foreground">Approved</h3>
                        <p className="text-2xl font-bold">1</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-medium text-muted-foreground">Rejected</h3>
                        <p className="text-2xl font-bold">1</p>
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center justify-between w-full">
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="all" className="flex-1">All Appeals</TabsTrigger>
                            <TabsTrigger value="pending" className="flex-1">Pending</TabsTrigger>
                            <TabsTrigger value="approved" className="flex-1">Approved</TabsTrigger>
                            <TabsTrigger value="rejected" className="flex-1">Rejected</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all" className="border rounded-md mt-6 w-full">
                            <div className="overflow-x-auto w-full">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b bg-muted/50">
                                            <th className="px-4 py-3 text-left text-sm font-medium">Appeal ID</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium">Date Filed</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium">Violation</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appeals.map((appeal) => (
                                            <tr key={appeal.id} className="border-b">
                                                <td className="px-4 py-3 text-sm">{appeal.appealId}</td>
                                                <td className="px-4 py-3 text-sm">{appeal.dateFiled}</td>
                                                <td className="px-4 py-3 text-sm">{appeal.violation}</td>
                                                <td className="px-4 py-3 text-sm">
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            appeal.status === "approved"
                                                                ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                                                                : appeal.status === "rejected"
                                                                    ? "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
                                                                    : "bg-yellow-50 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-700"
                                                        }
                                                    >
                                                        {appeal.status === "approved" ? "Approved" : appeal.status === "rejected" ? "Rejected" : "In Review"}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <Button variant="outline" size="sm">View Details</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex items-center justify-between p-4 w-full">
                                <div className="text-sm text-muted-foreground">Showing {appeals.length} of {appeals.length} appeals</div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" disabled>Previous</Button>
                                    <Button variant="outline" size="sm" disabled={appeals.length < 10}>Next</Button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default FineAppealPage;