import FooterColumn from "./FooterColumn";
import FooterBottom from "./FooterBottom";
import FooterSocial from "./FooterSocial";

import { homepage } from "@/data/homepage";

import { Container } from "@/components/ui";

export default function Footer() {

  const footer=homepage.footer;

  return(

    <footer className="bg-neutral-950 text-white">

      <Container>

        <div className="py-20">

          <div className="grid gap-16 lg:grid-cols-5">

            {/* Brand */}

            <div className="lg:col-span-2">

              <h2 className="text-3xl font-bold">
                YOUR BRAND
              </h2>

              <p className="mt-6 max-w-md leading-8 text-white/70">
                {footer.description}
              </p>

              <FooterSocial
                socials={footer.socials}
              />

            </div>

            {/* Columns */}

            <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:col-span-3">

              {footer.columns.map((column)=>(
                <FooterColumn
                  key={column.title}
                  column={column}
                />
              ))}

              <div>

                <h3 className="mb-6 text-lg font-semibold">
                  Contact
                </h3>

                <ul className="space-y-4 text-white/70">

                  <li>{footer.contact.address}</li>

                  <li>{footer.contact.phone}</li>

                  <li>{footer.contact.email}</li>

                </ul>

              </div>

            </div>

          </div>

          <FooterBottom/>

        </div>

      </Container>

    </footer>

  )

}