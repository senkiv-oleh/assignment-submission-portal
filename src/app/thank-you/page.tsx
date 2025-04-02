"use client";

import { useEffect, useState } from "react";

interface SubmittedData {
    name: string;
    email: string;
    candidate_level: string;
}

export default function ThankYouPage() {
    const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);

    useEffect(() => {
        const storedData = localStorage.getItem("submittedAssignment");
        if (storedData) {
            setSubmittedData(JSON.parse(storedData));
            localStorage.removeItem("submittedAssignment");
        }
    }, []);

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full sm:w-2/3 bg-white shadow-lg rounded-2xl p-10 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You for Submitting Your Assignment!</h1>
                <p className="text-gray-600 mb-6">We have received your submission.</p>

                {submittedData && (
                    <div className="bg-gray-50 p-6 rounded-xl shadow-md text-left">
                        <p className="text-lg text-gray-700"><strong>Name:</strong> {submittedData.name}</p>
                        <p className="text-lg text-gray-700"><strong>Email:</strong> {submittedData.email}</p>
                        <p className="text-lg text-gray-700"><strong>Candidate Level:</strong> {submittedData.candidate_level}</p>
                    </div>
                )}

                <a href="/" className="mt-6 inline-block bg-green-700 hover:bg-black text-white font-semibold py-3 px-6 rounded-xl transition">
                    Submit Another Assignment
                </a>
            </div>
        </main>
    );
}
