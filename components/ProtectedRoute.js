"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(null); // null = checking

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/signup"); // redirect immediately
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  // prevent rendering children until authorization is checked
  if (isAuthorized === null) {
    return null; // or a loader <p>Loading...</p>
  }

  return <>{children}</>;
}
