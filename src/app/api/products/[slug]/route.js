import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import ProductVariant from "@/models/ProductVariant";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { slug } = await params;

    const product = await Product.findOne({
      slug: slug.toLowerCase(),
      isActive: true,
    }).lean();

    if (!product) {
      return NextResponse.json(
        {
          message: "Product not found.",
        },
        {
          status: 404,
        },
      );
    }

    const variants = await ProductVariant.find({
      productId: product._id,
      isActive: true,
    })
      .sort({ createdAt: 1 })
      .lean();

    return NextResponse.json({
      product: {
        ...product,
        variants,
      },
    });
  } catch (error) {
    console.error("GET_PRODUCT_ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to load product.",
      },
      {
        status: 500,
      },
    );
  }
}
