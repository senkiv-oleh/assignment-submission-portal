import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitAssignment } from "@/services/apiService";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  AssignmentData,
  SubmittedAssignmentData,
} from "@/types/AssignmentData";
import { THANK_YOU_ROUTE } from "@/constants/routs";
import { STORAGE_KEY } from "@/constants/keys";
import {
  API_RESPONSE_ERROR,
  SUBMISSION_FAILED_ERROR,
} from "@/constants/errors";

export const useSubmitAssignment = () => {
  const router = useRouter();
  const [, setSubmittedAssignment] =
    useLocalStorage<SubmittedAssignmentData | null>(STORAGE_KEY, null);

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
        router.push(THANK_YOU_ROUTE);
      } else {
        setError(API_RESPONSE_ERROR);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : SUBMISSION_FAILED_ERROR);
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
