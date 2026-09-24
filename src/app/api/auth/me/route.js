import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          user: null,
        },
        {
          status: 401,
        },
      );
    }

    let decoded;

    try {
      decoded = verifyToken(token);
    } catch {
      return NextResponse.json(
        {
          success: false,
          user: null,
        },
        {
          status: 401,
        },
      );
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          user: null,
        },
        {
          status: 401,
        },
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("AUTH_ME_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        user: null,
      },
      {
        status: 500,
      },
    );
  }
}
