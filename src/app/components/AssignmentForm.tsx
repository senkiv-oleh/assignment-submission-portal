"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormData } from "../../types/FormData";
import { schema } from "../../models/schema";

export default function AssignmentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [candidateLevels, setCandidateLevels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://tools.qa.ale.ai/api/tools/candidates/levels")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.levels)) {
          setCandidateLevels(data.levels);
        } else {
          throw new Error("Invalid API response");
        }
      })
      .catch(() => setError("Failed to fetch candidate levels"))
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(
        "https://tools.qa.ale.ai/api/tools/candidates/assignments",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        localStorage.setItem(
          "submittedAssignment",
          JSON.stringify({
            name: data.name,
            email: data.email,
            candidate_level: data.candidate_level,
          }),
        );
        window.location.href = "/thank-you";
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Submission failed");
      }
    } catch {
      setError("An error occurred while submitting the form");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-screen-lg mx-auto p-10 bg-white shadow-lg rounded-2xl w-full sm:w-2/3"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Submit Your Assignment
      </h2>

      {error && <p className="text-red-500 text-center mb-6">{error}</p>}

      <div className="mb-6">
        <label className="block text-gray-700 font-medium">Name</label>
        <input
          type="text"
          {...register("name")}
          className="border rounded-xl p-2 w-full focus:ring-1 focus:ring-green-700 outline-none"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium">Email</label>
        <input
          type="email"
          {...register("email")}
          className="border rounded-xl p-2 w-full focus:ring-1 focus:ring-green-700 outline-none"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium">
          Assignment Description
        </label>
        <textarea
          {...register("assignment_description")}
          className="border rounded-xl p-2 w-full focus:ring-1 focus:ring-green-700 outline-none resize-none"
          rows={4}
        />
        {errors.assignment_description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.assignment_description.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium">
          GitHub Repository URL
        </label>
        <input
          type="url"
          {...register("github_repo_url")}
          className="border rounded-xl p-2 w-full focus:ring-1 focus:ring-green-700 outline-none"
        />
        {errors.github_repo_url && (
          <p className="text-red-500 text-sm mt-1">
            {errors.github_repo_url.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium">
          Candidate Level
        </label>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <select
            {...register("candidate_level")}
            className="border rounded-xl p-2 w-full focus:ring-1 focus:ring-green-700 outline-none"
          >
            <option value="">Select a level</option>
            {candidateLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        )}
        {errors.candidate_level && (
          <p className="text-red-500 text-sm mt-1">
            {errors.candidate_level.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-8 bg-green-700 hover:bg-black text-white font-semibold p-4 w-full rounded-xl transition"
      >
        Submit Assignment
      </button>
    </form>
  );
}
