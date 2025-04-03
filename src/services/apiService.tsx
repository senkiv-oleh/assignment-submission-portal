import { AssignmentData } from "@/types/AssignmentData";
import { API_BASE_URL } from "@/constants/apis";
import {
  CANDIDATE_LEVELS_FETCH_ERROR,
  INVALID_API_RESPONSE_ERROR,
  SUBMISSION_FAILED_ERROR,
} from "@/constants/errors";

export const fetchCandidateLevels = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/levels`);

    if (!response.ok) {
      throw new Error(CANDIDATE_LEVELS_FETCH_ERROR);
    }

    const data = await response.json();

    if (!Array.isArray(data.levels)) {
      throw new Error(INVALID_API_RESPONSE_ERROR);
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
      throw new Error(errorData.message || SUBMISSION_FAILED_ERROR);
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
