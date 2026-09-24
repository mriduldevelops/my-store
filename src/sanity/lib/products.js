import { client } from "./client";

import {
  PRODUCTS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  FEATURED_PRODUCTS_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
} from "./queries";

/* -------------------------------- */
/* Get all products                 */
/* -------------------------------- */

export async function getProducts() {
  return client.fetch(
    PRODUCTS_QUERY,
    {},
    {
      next: {
        revalidate: 60,
      },
    },
  );
}

/* -------------------------------- */
/* Get featured products            */
/* -------------------------------- */

export async function getFeaturedProducts() {
  return client.fetch(
    FEATURED_PRODUCTS_QUERY,
    {},
    {
      next: {
        revalidate: 60,
      },
    },
  );
}

/* -------------------------------- */
/* Get product by slug              */
/* -------------------------------- */

export async function getProductBySlug(slug) {
  return client.fetch(
    PRODUCT_BY_SLUG_QUERY,
    {
      slug,
    },
    {
      next: {
        revalidate: 60,
      },
    },
  );
}

/* -------------------------------- */
/* Get products by category         */
/* -------------------------------- */

export async function getProductsByCategory(slug) {
  return client.fetch(
    PRODUCTS_BY_CATEGORY_QUERY,
    {
      slug,
    },
    {
      next: {
        revalidate: 60,
      },
    },
  );
}
