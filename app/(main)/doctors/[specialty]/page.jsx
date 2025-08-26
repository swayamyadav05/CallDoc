"use client";

import { useParams } from "next/navigation";
import React from "react";

const specialityPage = () => {
  const { speciality } = useParams();

  return <div>specialityPage: {speciality}</div>;
};

export default specialityPage;
