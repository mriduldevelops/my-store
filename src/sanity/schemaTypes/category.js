import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Category Name",
      type: "string",

      validation: (rule) => rule.required().min(2),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",

      options: {
        source: "name",
      },

      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",

      rows: 4,
    }),

    defineField({
      name: "image",
      title: "Category Image",
      type: "image",

      options: {
        hotspot: true,
      },
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
      media: "image",
    },
  },
});
