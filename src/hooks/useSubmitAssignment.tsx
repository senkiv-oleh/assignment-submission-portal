import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitAssignment } from "@/services/apiService";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  AssignmentData,
  SubmittedAssignmentData,
} from "@/types/AssignmentData";

export const useSubmitAssignment = () => {
  const router = useRouter();
  const [, setSubmittedAssignment] =
    useLocalStorage<SubmittedAssignmentData | null>(
      "submittedAssignment",
      null,
    );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: AssignmentData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result: AssignmentData = await submitAssignment(data);

      if (result?.name && result?.email && result?.candidate_level) {
        const submittedData: SubmittedAssignmentData = {
          email: result.email,
          name: result.name,
          candidate_level: result.candidate_level,
        };

        setSubmittedAssignment(submittedData);
        router.push("/thank-you");
      } else {
        setError("Invalid data received from the API.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitAssignment: submit,
    isLoading: isSubmitting,
    error,
  };
};
