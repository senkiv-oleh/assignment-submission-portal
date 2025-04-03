export interface AssignmentData {
  name: string;
  email: string;
  assignment_description: string;
  github_repo_url: string;
  candidate_level: "Junior" | "Middle" | "Senior" | "Principal";
}

export interface SubmittedAssignmentData {
  name: string;
  email: string;
  candidate_level: "Junior" | "Middle" | "Senior" | "Principal";
}
