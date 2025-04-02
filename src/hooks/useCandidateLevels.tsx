import { useState, useEffect } from "react";
import { fetchCandidateLevels } from "@/services/apiService";

export const useCandidateLevels = () => {
  const [candidateLevels, setCandidateLevels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCandidateLevels()
      .then(setCandidateLevels)
      .catch(() => setError("Failed to fetch candidate levels"))
      .finally(() => setLoading(false));
  }, []);

  return { candidateLevels, loading, error };
};
