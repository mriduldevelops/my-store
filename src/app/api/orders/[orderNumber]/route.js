import { NextResponse } from "next/server";

import Order from "@/models/Order";
import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";

export async function GET(request, { params }) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required.",
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
          success: false,
          message: "Order number is required.",
        },
        {
          status: 400,
        },
      );
    }

    const order = await Order.findOne({
      orderNumber,
      userId: user._id,
    }).lean();

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("GET_ORDER_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch order.",
      },
      {
        status: 500,
      },
    );
  }
}
