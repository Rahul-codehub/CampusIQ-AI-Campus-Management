import { authApi } from "@/integrations/mongodb/api";

export async function changePassword(
  currentPassword: string,
  newPassword: string
) {
  return authApi.changePassword({
    currentPassword,
    newPassword,
  });
}