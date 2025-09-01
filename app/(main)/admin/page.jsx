import {
  getPendingDoctors,
  getRejectedDoctors,
  getVerifiedDoctors,
} from "@/actions/admin";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import PendingDoctors from "./_components/pending-doctors";
import VerifiedDoctors from "./_components/verified-doctors";
import RejectedDoctors from "./_components/rejected-doctors";

const AdminPage = async () => {
  const [
    pendingDoctorsData,
    verifiedDoctorsData,
    rejectedDoctorsData,
  ] = await Promise.all([
    getPendingDoctors(),
    getVerifiedDoctors(),
    getRejectedDoctors(),
  ]);

  return (
    <div>
      <TabsContent value="pending">
        <PendingDoctors doctors={pendingDoctorsData.doctors || []} />
      </TabsContent>
      <TabsContent value="doctors">
        <VerifiedDoctors
          doctors={verifiedDoctorsData.doctors || []}
        />
      </TabsContent>
      <TabsContent value="rejected">
        <RejectedDoctors
          doctors={rejectedDoctorsData.doctors || []}
        />
      </TabsContent>
    </div>
  );
};

export default AdminPage;
