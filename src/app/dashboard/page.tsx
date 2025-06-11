"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    getUser(token)
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      });
  }, []);

  if (!user) return <p className="pt-20 px-6">Loading...</p>;

  return (
    <div className="pt-20 px-6">
      <h1 className="text-2xl font-bold text-gray-950">Halo, {user.name}!</h1>
    </div>
  );
}
