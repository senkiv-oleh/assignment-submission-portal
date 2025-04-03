import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().min(1, "Name is required").required("Name is required"),
  email: yup
    .string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  assignment_description: yup
    .string()
    .min(10, "Assignment description must be at least 10 characters")
    .required("Assignment description is required"),
  github_repo_url: yup
    .string()
    .url("GitHub repository URL must be a valid URL")
    .required("GitHub repository URL is required"),
  candidate_level: yup
    .string()
    .oneOf(
      ["Junior", "Middle", "Senior", "Principal"],
      "Candidate level must be one of Junior, Middle, Senior, or Principal",
    )
    .required("Candidate level is required"),
});
