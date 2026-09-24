import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";

export async function GET(request, { params }) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized.",
        },
        {
          status: 401,
        },
      );
    }

    const { orderNumber } = await params;

    if (!orderNumber) {
      return NextResponse.json(
        {
          message: "Order number is required.",
        },
        {
          status: 400,
        },
      );
    }

    await connectDB();

    const order = await Order.findOne({
      orderNumber,
      userId: user._id,
    }).lean();

    if (!order) {
      return NextResponse.json(
        {
          message: "Order not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        order,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET_ORDER_DETAILS_ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to load order.",
      },
      {
        status: 500,
      },
    );
  }
}
