import { Container } from "@/components/ui";

export default function ShopLayout({ sidebar, toolbar, children, pagination }) {
  return (
    <Container className="py-12">
      {toolbar}

      <div className="mt-8 grid gap-10 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">{sidebar}</aside>

        <main>
          {children}

          <div className="mt-16">{pagination}</div>
        </main>
      </div>
    </Container>
  );
}
