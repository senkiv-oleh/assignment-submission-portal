"use client";

import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { SubmittedAssignmentData } from "@/types/AssignmentData";
import { HOME_ROUTE } from "@/constants/routs";
import { STORAGE_KEY } from "@/constants/keys";
import {
  THANK_YOU_MESSAGE,
  ASSIGNMENT_RECEIVED_MESSAGE,
} from "@/constants/messages";

export default function ThankYouPage() {
  const [submittedAssignment] = useLocalStorage<SubmittedAssignmentData | null>(
    STORAGE_KEY,
    null,
  );

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {THANK_YOU_MESSAGE}
        </h2>
        <p className="text-gray-600 mb-6">{ASSIGNMENT_RECEIVED_MESSAGE}</p>

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
          href={HOME_ROUTE}
          className="mt-6 inline-block bg-green-700 hover:bg-black text-white font-semibold py-3 px-6 rounded-xl transition"
        >
          Submit Another Assignment
        </Link>
      </div>
    </main>
  );
}
