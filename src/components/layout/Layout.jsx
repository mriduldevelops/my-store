import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <AnnouncementBar />

      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
}