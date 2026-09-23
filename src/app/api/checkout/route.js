import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      items,
      customer,
    } = body;

    /* -------------------------------- */
    /* Basic validation                 */
    /* -------------------------------- */

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart is empty",
        },
        {
          status: 400,
        }
      );
    }

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Customer information is required",
        },
        {
          status: 400,
        }
      );
    }

    /* -------------------------------- */
    /* Connect database                 */
    /* -------------------------------- */

    await connectDB();

    /* -------------------------------- */
    /* Fetch products from DB           */
    /* -------------------------------- */

    const productIds = items.map(
      (item) => item.productId
    );

    const products = await Product.find({
      _id: {
        $in: productIds,
      },

      isActive: true,
    }).lean();

    /* -------------------------------- */
    /* Make lookup map                  */
    /* -------------------------------- */

    const productMap = new Map(
      products.map((product) => [
        product._id.toString(),
        product,
      ])
    );

    /* -------------------------------- */
    /* Calculate order                  */
    /* -------------------------------- */

    const validatedItems = [];

    let subtotal = 0;

    for (const item of items) {
      const product = productMap.get(
        String(item.productId)
      );

      if (!product) {
        return NextResponse.json(
          {
            success: false,
            message:
              "One or more products are unavailable",
          },
          {
            status: 400,
          }
        );
      }

      const quantity = Number(item.quantity);

      if (
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid product quantity",
          },
          {
            status: 400,
          }
        );
      }

      /* ------------------------------ */
      /* Variant product                 */
      /* ------------------------------ */

      let selectedVariant = null;

      if (product.variants?.length > 0) {
        if (!item.variantId) {
          return NextResponse.json(
            {
              success: false,
              message: `Please select a variant for ${product.name}`,
            },
            {
              status: 400,
            }
          );
        }

        selectedVariant =
          product.variants.find(
            (variant) =>
              String(variant.id) ===
              String(item.variantId)
          );

        if (!selectedVariant) {
          return NextResponse.json(
            {
              success: false,
              message:
                "Selected product variant is unavailable",
            },
            {
              status: 400,
            }
          );
        }
      }

      /* ------------------------------ */
      /* Price and stock                 */
      /* ------------------------------ */

      const unitPrice =
        selectedVariant?.price ??
        product.price;

      const stock =
        selectedVariant?.stock ??
        product.stock ??
        0;

      if (stock < quantity) {
        return NextResponse.json(
          {
            success: false,
            message: `${product.name} does not have enough stock`,
          },
          {
            status: 400,
          }
        );
      }

      const lineTotal =
        unitPrice * quantity;

      subtotal += lineTotal;

      validatedItems.push({
        productId: product._id.toString(),

        variantId:
          selectedVariant?.id ?? null,

        productName: product.name,

        quantity,

        unitPrice,

        lineTotal,

        sku:
          selectedVariant?.sku ??
          product.sku ??
          null,

        variants:
          selectedVariant?.options
            ? Object.fromEntries(
                selectedVariant.options
              )
            : {},
      });
    }

    /* -------------------------------- */
    /* Shipping                         */
    /* -------------------------------- */

    const shipping = 0;

    /* -------------------------------- */
    /* Tax                              */
    /* -------------------------------- */

    const tax = 0;

    /* -------------------------------- */
    /* Discount                         */
    /* -------------------------------- */

    const discount = 0;

    /* -------------------------------- */
    /* Final total                      */
    /* -------------------------------- */

    const total =
      subtotal +
      shipping +
      tax -
      discount;

    /* -------------------------------- */
    /* Response                         */
    /* -------------------------------- */

    return NextResponse.json({
      success: true,

      data: {
        items: validatedItems,

        customer,

        pricing: {
          subtotal,
          shipping,
          tax,
          discount,
          total,
        },
      },
    });
  } catch (error) {
    console.error(
      "Checkout API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while processing checkout",
      },
      {
        status: 500,
      }
    );
  }
}