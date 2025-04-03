"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { SubmittedAssignmentData } from "@/types/AssignmentData";
import Link from "next/link";

export default function ThankYouPage() {
  const [submittedAssignment] = useLocalStorage<SubmittedAssignmentData | null>(
    "submittedAssignment",
    null,
  );

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Thank You for Submitting!
        </h2>
        <p className="text-gray-600 mb-6">Your assignment has been received.</p>

        {submittedAssignment && (
          <div className="bg-gray-100 p-4 rounded-md text-left">
            <p>
              <strong>Name:</strong> {submittedAssignment.name}
            </p>
            <p>
              <strong>Email:</strong> {submittedAssignment.email}
            </p>
            <p>
              <strong>Candidate Level:</strong>{" "}
              {submittedAssignment.candidate_level}
            </p>
          </div>
        )}

        <Link
          href="/"
          className="mt-6 inline-block bg-green-700 hover:bg-black text-white font-semibold py-3 px-6 rounded-xl transition"
        >
          Submit Another Assignment
        </Link>
      </div>
    </main>
  );
}
