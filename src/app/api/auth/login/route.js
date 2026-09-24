import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { createToken } from "@/lib/auth";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { email, password } = body;

    /* ----------------------------- */
    /* Validation                    */
    /* ----------------------------- */

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        {
          status: 400,
        },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    /* ----------------------------- */
    /* Find user                     */
    /* ----------------------------- */

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        {
          status: 401,
        },
      );
    }

    /* ----------------------------- */
    /* Compare password               */
    /* ----------------------------- */

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        {
          status: 401,
        },
      );
    }

    /* ----------------------------- */
    /* Create token                   */
    /* ----------------------------- */

    const token = createToken(user);

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        user: {
          id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          isVerified: user.isVerified,
        },
      },
      {
        status: 200,
      },
    );

    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("LOGIN_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
      },
    );
  }
}
