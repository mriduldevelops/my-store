import { defineQuery } from "next-sanity";

/* -------------------------------- */
/* All active products              */
/* -------------------------------- */

export const PRODUCTS_QUERY = defineQuery(`
  *[
    _type == "product" &&
    isActive == true
  ]
  | order(_createdAt desc)
  {
    _id,
    name,
    slug,
    description,
    price,
    compareAtPrice,
    featured,

    images[] {
      ...,
      alt
    },

    "category": category->{
      _id,
      name,
      slug
    },

    variants[] {
      _key,
      name,
      sku,
      price,
      stock,
      isActive,

      options {
        color,
        size,
        material
      },

      image {
        ...,
        alt
      }
    },

    seo
  }
`);

/* -------------------------------- */
/* Featured products                */
/* -------------------------------- */

export const FEATURED_PRODUCTS_QUERY = defineQuery(`
  *[
    _type == "product" &&
    isActive == true &&
    featured == true
  ]
  | order(_createdAt desc)
  {
    _id,
    name,
    slug,
    price,
    compareAtPrice,

    images[] {
      ...,
      alt
    },

    variants[] {
      _key,
      name,
      sku,
      price,
      stock,
      isActive,

      options {
        color,
        size,
        material
      },

      image {
        ...,
        alt
      }
    }
  }
`);

/* -------------------------------- */
/* Product by slug                  */
/* -------------------------------- */

export const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "product" &&
    slug.current == $slug &&
    isActive == true
  ][0]
  {
    _id,
    name,
    slug,
    description,
    price,
    compareAtPrice,
    featured,

    images[] {
      ...,
      alt
    },

    "category": category->{
      _id,
      name,
      slug
    },

    variants[] {
      _key,
      name,
      sku,
      price,
      stock,
      isActive,

      options {
        color,
        size,
        material
      },

      image {
        ...,
        alt
      }
    },

    seo
  }
`);

/* -------------------------------- */
/* Products by category             */
/* -------------------------------- */

export const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
    *[
      _type == "product" &&
      isActive == true &&
      category->slug.current == $slug
    ]
    | order(_createdAt desc)
    {
      _id,
      name,
      slug,
      price,
      compareAtPrice,

      images[] {
        ...,
        alt
      },

      variants[] {
        _key,
        name,
        sku,
        price,
        stock,
        isActive,

        options {
          color,
          size,
          material
        },

        image {
          ...,
          alt
        }
      }
    }
  `);

/* -------------------------------- */
/* Categories                       */
/* -------------------------------- */

export const CATEGORIES_QUERY = defineQuery(`
  *[
    _type == "category" &&
    isActive == true
  ]
  | order(name asc)
  {
    _id,
    name,
    slug,
    description,

    image {
      ...,
      alt
    }
  }
`);
