import React, { Suspense } from "react";
import SignIn from "@/components/auth/SignIn";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignIn />
    </Suspense>
  );
}
