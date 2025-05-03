import React, { Suspense } from "react";
import SignUp from "@/components/auth/SignUp";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUp />
    </Suspense>
  );
}
