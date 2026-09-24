import { cookies } from "next/headers";

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export async function getAuthenticatedUser() {
  await connectDB();

  const cookieStore = await cookies();

  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  let decoded;

  try {
    decoded = verifyToken(token);
  } catch {
    return null;
  }

  if (!decoded?.userId) {
    return null;
  }

  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    return null;
  }

  return user;
}
