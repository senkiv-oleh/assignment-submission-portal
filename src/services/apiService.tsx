import { AssignmentData } from "@/types/AssignmentData";

const API_BASE_URL = "https://tools.qa.ale.ai/api/tools/candidates";

export const fetchCandidateLevels = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/levels`);

    if (!response.ok) {
      throw new Error("Failed to fetch candidate levels");
    }

    const data = await response.json();

    if (!Array.isArray(data.levels)) {
      throw new Error("Invalid API response");
    }

    return data.levels;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const submitAssignment = async (
  data: AssignmentData,
): Promise<AssignmentData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/assignments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Submission failed");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
