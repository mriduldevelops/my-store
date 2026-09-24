import { client } from "./client";

import { CATEGORIES_QUERY } from "./queries";

export async function getCategories() {
  return client.fetch(
    CATEGORIES_QUERY,
    {},
    {
      next: {
        revalidate: 300,
      },
    },
  );
}
