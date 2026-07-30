import { Container } from "@/components/ui";

export default function AnnouncementBar() {
  return (
    <div className="bg-black py-2 text-white">
      <Container>
        <p className="text-center text-sm">
          🚚 Free Shipping on orders above ₹999
        </p>
      </Container>
    </div>
  );
}