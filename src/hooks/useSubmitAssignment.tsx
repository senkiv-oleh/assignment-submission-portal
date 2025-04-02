import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitAssignment as submitAssignmentApi } from "@/services/apiService"; // <-- перейменував імпорт
import { AssignmentData } from "@/types/AssignmentData";

export const useSubmitAssignment = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitAssignment = async (data: AssignmentData) => {
    // <-- змінив назву функції
    setLoading(true);
    setError(null);

    try {
      await submitAssignmentApi(data); // <-- використовуємо коректний імпорт
      localStorage.setItem("submittedAssignment", JSON.stringify(data));
      router.push("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return { submitAssignment: handleSubmitAssignment, loading, error }; // <-- повертаємо нову назву
};
