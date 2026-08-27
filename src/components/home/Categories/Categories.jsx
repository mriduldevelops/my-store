import { Container, Section } from "@/components/ui";
import SectionTitle from "@/components/common/SectionTitle";
import CategoryCard from "@/components/category/CategoryCard";
import { categories } from "@/data/categories";

export default function Categories() {
  return (
    <Section>
      <Container>
        <SectionTitle
          title="Shop by Category"
          subtitle="Find products curated for every lifestyle."
        />

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
