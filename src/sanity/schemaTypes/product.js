import { defineArrayMember, defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",

  groups: [
    {
      name: "basic",
      title: "Basic Information",
    },
    {
      name: "media",
      title: "Media",
    },
    {
      name: "variants",
      title: "Variants",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    /* -------------------------------- */
    /* Basic Information                */
    /* -------------------------------- */

    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      group: "basic",

      validation: (rule) => rule.required().min(2),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",

      options: {
        source: "name",
      },

      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "basic",

      rows: 6,
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "basic",

      to: [
        {
          type: "category",
        },
      ],
    }),

    defineField({
      name: "price",
      title: "Base Price",
      type: "number",
      group: "basic",

      validation: (rule) => rule.required().min(0),
    }),

    defineField({
      name: "compareAtPrice",
      title: "Compare At Price",
      type: "number",
      group: "basic",

      validation: (rule) => rule.min(0),
    }),

    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      group: "basic",

      initialValue: true,
    }),

    defineField({
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      group: "basic",

      initialValue: false,
    }),

    /* -------------------------------- */
    /* Media                            */
    /* -------------------------------- */

    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      group: "media",

      options: {
        layout: "grid",
      },

      of: [
        defineArrayMember({
          type: "image",

          options: {
            hotspot: true,
          },

          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",

              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],

      validation: (rule) => rule.min(1),
    }),

    /* -------------------------------- */
    /* Variants                         */
    /* -------------------------------- */

    defineField({
      name: "variants",
      title: "Product Variants",
      type: "array",
      group: "variants",

      of: [
        defineArrayMember({
          name: "variant",
          title: "Variant",
          type: "object",

          fields: [
            defineField({
              name: "name",
              title: "Variant Name",
              type: "string",

              description: "Example: Black / Medium",

              validation: (rule) => rule.required(),
            }),

            defineField({
              name: "sku",
              title: "SKU",
              type: "string",

              validation: (rule) => rule.required(),
            }),

            defineField({
              name: "price",
              title: "Variant Price",
              type: "number",

              description: "Leave empty to use the product base price.",

              validation: (rule) => rule.min(0),
            }),

            defineField({
              name: "stock",
              title: "Stock",
              type: "number",

              initialValue: 0,

              validation: (rule) => rule.required().integer().min(0),
            }),

            defineField({
              name: "image",
              title: "Variant Image",
              type: "image",

              options: {
                hotspot: true,
              },
            }),

            defineField({
              name: "options",
              title: "Options",
              type: "object",

              fields: [
                defineField({
                  name: "color",
                  title: "Color",
                  type: "string",
                }),

                defineField({
                  name: "size",
                  title: "Size",
                  type: "string",
                }),

                defineField({
                  name: "material",
                  title: "Material",
                  type: "string",
                }),
              ],
            }),

            defineField({
              name: "isActive",
              title: "Active",
              type: "boolean",

              initialValue: true,
            }),
          ],

          preview: {
            select: {
              title: "name",
              sku: "sku",
              price: "price",
              stock: "stock",
              media: "image",
            },

            prepare({ title, sku, price, stock, media }) {
              return {
                title,
                subtitle: `${sku} • ₹${price ?? "Base price"} • Stock: ${stock}`,
                media,
              };
            },
          },
        }),
      ],
    }),

    /* -------------------------------- */
    /* SEO                              */
    /* -------------------------------- */

    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",

      fields: [
        defineField({
          name: "title",
          title: "SEO Title",
          type: "string",

          validation: (rule) => rule.max(60),
        }),

        defineField({
          name: "description",
          title: "SEO Description",
          type: "text",

          rows: 3,

          validation: (rule) => rule.max(160),
        }),

        defineField({
          name: "keywords",
          title: "Keywords",
          type: "array",

          of: [
            defineArrayMember({
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "name",
      media: "images.0",
      price: "price",
      active: "isActive",
    },

    prepare({ title, media, price, active }) {
      return {
        title,

        subtitle: `₹${price} • ${active ? "Active" : "Inactive"}`,

        media,
      };
    },
  },
});
