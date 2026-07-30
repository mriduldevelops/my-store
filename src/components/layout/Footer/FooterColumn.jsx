import Link from "next/link";

export default function FooterColumn({
  column,
}) {
  return (
    <div>

      <h3 className="mb-6 font-semibold text-lg">
        {column.title}
      </h3>

      <ul className="space-y-4">

        {column.links.map((link)=>(

          <li key={link.label}>

            <Link
              href={link.href}
              className="text-white/70 transition hover:text-white"
            >
              {link.label}
            </Link>

          </li>

        ))}

      </ul>

    </div>
  );
}