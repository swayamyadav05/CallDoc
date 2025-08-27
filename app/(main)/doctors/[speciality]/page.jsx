"use client";

import { useParams } from "next/navigation";
import React from "react";

const specialtyPage = () => {
  const { specialty } = useParams();

  return <div>specialtyPage: {specialty}</div>;
};

export default specialtyPage;
