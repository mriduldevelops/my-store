export async function logoutUser() {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    return response.ok;
  } catch (error) {
    console.error("LOGOUT_ERROR:", error);

    return false;
  }
}
