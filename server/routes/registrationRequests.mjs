import {
  handleRegistrationRequest,
} from "../controllers/registrationController.mjs";

export async function handleRegistrationRequests(
  req,
  res,
  pathParts
) {
  return handleRegistrationRequest(
    req,
    res,
    pathParts
  );
}