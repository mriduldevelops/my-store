import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { createToken } from "@/lib/auth";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { firstName, lastName, email, phone, password } = body;

    /* ----------------------------- */
    /* Validation                    */
    /* ----------------------------- */

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "First name, last name, email and password are required.",
        },
        {
          status: 400,
        },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must contain at least 8 characters.",
        },
        {
          status: 400,
        },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    /* ----------------------------- */
    /* Check existing user            */
    /* ----------------------------- */

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists.",
        },
        {
          status: 409,
        },
      );
    }

    /* ----------------------------- */
    /* Hash password                  */
    /* ----------------------------- */

    const hashedPassword = await bcrypt.hash(password, 12);

    /* ----------------------------- */
    /* Create user                    */
    /* ----------------------------- */

    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      phone: phone?.trim() || "",
      password: hashedPassword,
    });

    console.log(user)

    /* ----------------------------- */
    /* Create token                   */
    /* ----------------------------- */

    const token = createToken(user);

    /* ----------------------------- */
    /* Response                       */
    /* ----------------------------- */

    const response = NextResponse.json(
      {
        success: true,
        message: "Account created successfully.",
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
        status: 201,
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
    console.error("REGISTER_ERROR:", error);

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
