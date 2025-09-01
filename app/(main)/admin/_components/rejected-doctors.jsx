"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, User2 } from "lucide-react";
import React, { useState } from "react";

const RejectedDoctors = ({ doctors }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // First filter for rejected doctors only
  const rejectedDoctors = doctors.filter(
    (doctor) => doctor.verificationStatus === "REJECTED"
  );

  // Then apply search filter
  const filteredDoctors = rejectedDoctors.filter((doctor) => {
    const query = searchTerm.toLowerCase();

    const name = (doctor.name ?? "").toLowerCase();
    const specialty = (doctor.specialty ?? "").toLowerCase();
    const email = (doctor.email ?? "").toLowerCase();
    return (
      name.includes(query) ||
      specialty.includes(query) ||
      email.includes(query)
    );
  });
  return (
    <div>
      <Card className={"bg-muted/20 border-red-900/20"}>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className={"text-xl font-bold text-white"}>
                Rejected Doctors
              </CardTitle>
              <CardDescription>
                View and manage all rejected doctors
              </CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5  top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search doctors..."
                className={"pl-8 bg-background border-red-900/20"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm
                ? "No rejected doctors match your search criteria."
                : "No rejected doctors available."}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDoctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className={
                    "bg-background border-red-900/20 hover:border-red-700/30 transition-all"
                  }>
                  <CardContent className={"p-4"}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted/20 rounded-full p-2">
                          <User2 className="h-5 w-5 text-red-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {doctor.specialty} • {doctor.experience}{" "}
                            years of experience
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-auto">
                        <Badge
                          variant={"outline"}
                          className={
                            "bg-red-900/20 border-red-900/30 text-red-400"
                          }>
                          Rejected
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RejectedDoctors;
