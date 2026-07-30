import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedBanner from "@/components/home/FeaturedBanner";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import NewArrivals from "@/components/home/NewArrivals";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Categories />

      <FeaturedProducts />

      <FeaturedBanner />

      <WhyChooseUs />

      <NewArrivals />

      <Testimonials />

      <CtaBanner />
    </>
  );
}