import * as Yup from "yup";

export const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  assignment_description: Yup.string().required("Assignment description is required"),
  github_repo_url: Yup.string()
    .url("Invalid GitHub URL")
    .required("GitHub repository URL is required"),
  candidate_level: Yup.string().required("Candidate level is required"),
});

