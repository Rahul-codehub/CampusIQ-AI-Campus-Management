import { useEffect, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import { dbApi } from "@/integrations/mongodb/api";
import type { RegistrationRequest } from "@/integrations/mongodb/types";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const RegistrationRequests = () => {
  const [requests, setRequests] = useState<RegistrationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await dbApi.getRegistrationRequests();

      console.log("Registration Requests:", data);

      setRequests(data);
    } catch (error) {
      console.error("Failed to load requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await dbApi.approveRegistration(id);

      await loadRequests();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await dbApi.rejectRegistration(id);

      await loadRequests();
    } catch (error) {
      console.error(error);
    }
  };

  const pendingCount = requests.filter(
    (r) => r.status === "pending"
  ).length;

  const approvedCount = requests.filter(
    (r) => r.status === "approved"
  ).length;

  const rejectedCount = requests.filter(
    (r) => r.status === "rejected"
  ).length;

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Registration Requests
          </h1>

          <p className="text-muted-foreground">
            Review and manage pending registration requests.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Pending Requests
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {pendingCount}
              </h2>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Approved
              </p>

              <h2 className="text-3xl font-bold mt-2 text-green-600">
                {approvedCount}
              </h2>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Rejected
              </p>

              <h2 className="text-3xl font-bold mt-2 text-red-600">
                {rejectedCount}
              </h2>
            </CardContent>
          </Card>

        </div>

        {/* Registration Requests Table */}
        {loading ? (
          <Card>
            <CardContent className="p-6">
              Loading registration requests...
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">

              <table className="w-full">

                <thead className="border-b bg-muted">
                  <tr>

                    <th className="p-4 text-left">
                      Name
                    </th>

                    <th className="p-4 text-left">
                      Email
                    </th>

                    <th className="p-4 text-left">
                      Role
                    </th>

                    <th className="p-4 text-left">
                      Status
                    </th>

                    <th className="p-4 text-center">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {requests
                    .filter(
                      (request) =>
                        request.status === "pending"
                    )
                    .map((request) => (
                      <tr
                        key={request.id}
                        className="border-b hover:bg-muted/40 transition-colors"
                      >
                        <td className="p-4">
                          {request.full_name}
                        </td>

                        <td className="p-4">
                          {request.email}
                        </td>

                        <td className="p-4 capitalize">
                          {request.role}
                        </td>

                        <td className="p-4">
                          <Badge
                            variant="secondary"
                            className="bg-yellow-100 text-yellow-700"
                          >
                            Pending
                          </Badge>
                        </td>

                        <td className="p-4">
                          <div className="flex justify-center gap-2">

                            <Button
                              size="sm"
                              onClick={() => handleApprove(request.id)}
                            >
                              Approve
                            </Button>

                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReject(request.id)}
                            >
                              Reject
                            </Button>

                          </div>
                        </td>

                      </tr>
                    ))}

                  {requests.filter(
                    (request) =>
                      request.status === "pending"
                  ).length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="p-6 text-center text-muted-foreground"
                        >
                          No pending registration requests.
                        </td>
                      </tr>
                    )}

                </tbody>

              </table>

            </CardContent>
          </Card>
        )}

      </div>
    </AppLayout>
  );
};

export default RegistrationRequests;