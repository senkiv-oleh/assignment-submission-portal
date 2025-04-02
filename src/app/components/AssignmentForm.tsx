"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCandidateLevels } from "@/hooks/useCandidateLevels";
import { useSubmitAssignment } from "@/hooks/useSubmitAssignment";
import { schema } from "@/models/schema";
import { AssignmentData } from "@/types/AssignmentData";

export default function AssignmentForm() {
  const {
    candidateLevels,
    loading: isLevelsLoading,
    error: errorLevels,
  } = useCandidateLevels();
  const {
    submitAssignment,
    loading: isSubmitting,
    error: submitError,
  } = useSubmitAssignment();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignmentData>({
    resolver: yupResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(submitAssignment)}
      className="w-full max-w-3xl mx-auto p-10 bg-white shadow-lg rounded-2xl"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Assignment Submission
      </h2>

      <div className="p-5">
        <div className="mb-4 flex items-center">
          <label className="flex-initial w-52 block text-gray-700 font-medium pr-8">
            Name *
          </label>
          <div className="flex-1">
            <input
              type="text"
              {...register("name")}
              className="border rounded-md w-full h-10 p-2"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="flex-initial w-52 block text-gray-700 font-medium pr-8">
            Email *
          </label>
          <div className="flex-1">
            <input
              type="email"
              {...register("email")}
              className="border rounded-md w-full h-10 p-2"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4 flex">
          <label className="flex-initial w-52 block text-gray-700 font-medium">
            Assignment Description *
          </label>
          <div className="flex-1">
            <textarea
              {...register("assignment_description")}
              className="border rounded-md resize-none ml-auto w-full p-2"
              rows={4}
            />
            {errors.assignment_description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.assignment_description.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="flex-initial w-52 block text-gray-700 font-medium">
            GitHub Repository URL *
          </label>
          <div className="flex-1">
            <input
              type="url"
              {...register("github_repo_url")}
              className="border rounded-md w-full h-10 p-2"
            />
            {errors.github_repo_url && (
              <p className="text-red-500 text-xs mt-1">
                {errors.github_repo_url.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4 flex">
          <label className="flex-initial w-52 block text-gray-700 font-medium">
            Candidate Level *
          </label>
          <div className="flex-1">
            {isLevelsLoading ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <select
                {...register("candidate_level")}
                className="border rounded-md w-full h-10 p-2"
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
              <p className="text-red-500 text-xs mt-1">
                {errors.candidate_level.message}
              </p>
            )}
          </div>
        </div>

        {errorLevels && (
          <p className="text-red-500 text-center mb-4">{errorLevels}</p>
        )}
        {submitError && (
          <p className="text-red-500 text-center mb-4">{submitError}</p>
        )}

        <button
          type="submit"
          className="mt-8 bg-green-700 hover:bg-black text-white font-semibold p-4 w-full rounded-xl transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Assignment"}
        </button>
      </div>
    </form>
  );
}
