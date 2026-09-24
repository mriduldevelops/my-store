import { createClient } from "next-sanity";

import { projectId, dataset, apiVersion } from "../env";

const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
  stega: false,
});

const ORDER_PRODUCT_QUERY = `
  *[
    _type == "product" &&
    _id == $productId &&
    isActive == true
  ][0]{
    _id,
    name,
    price,

    "image": images[0].asset,

    variants[]{
      _key,
      name,
      sku,
      price,
      stock,
      isActive,
      options,
      "image": image.asset
    }
  }
`;

export async function getProductForOrder(productId) {
  return serverClient.fetch(
    ORDER_PRODUCT_QUERY,
    { productId },
    { cache: "no-store" },
  );
}
