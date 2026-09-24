import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import ProductVariant from "@/models/ProductVariant";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({
      isActive: true,
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      products,
    });
  } catch (error) {
    console.error("GET_PRODUCTS_ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to load products.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      slug,
      description,
      images,
      price,
      compareAtPrice,
      category,
      variants,
    } = body;

    if (!name || !slug || price === undefined) {
      return NextResponse.json(
        {
          message: "Name, slug and price are required.",
        },
        {
          status: 400,
        },
      );
    }

    const existingProduct = await Product.findOne({
      slug: slug.toLowerCase().trim(),
    });

    if (existingProduct) {
      return NextResponse.json(
        {
          message: "A product with this slug already exists.",
        },
        {
          status: 409,
        },
      );
    }

    const product = await Product.create({
      name: name.trim(),
      slug: slug.toLowerCase().trim(),
      description: description || "",
      images: Array.isArray(images) ? images : [],
      price: Number(price),
      compareAtPrice:
        compareAtPrice !== undefined && compareAtPrice !== null
          ? Number(compareAtPrice)
          : null,
      category: category || "",
    });

    let createdVariants = [];

    if (Array.isArray(variants) && variants.length > 0) {
      createdVariants = await ProductVariant.insertMany(
        variants.map((variant) => ({
          productId: product._id,
          name: variant.name,
          options: variant.options || {},
          price:
            variant.price !== undefined && variant.price !== null
              ? Number(variant.price)
              : null,
          sku: variant.sku,
          image: variant.image || null,
          stock: variant.stock !== undefined ? Number(variant.stock) : 0,
          isActive: variant.isActive !== false,
        })),
      );
    }

    return NextResponse.json(
      {
        message: "Product created successfully.",
        product: {
          ...product.toObject(),
          variants: createdVariants,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("CREATE_PRODUCT_ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to create product.",
      },
      {
        status: 500,
      },
    );
  }
}
