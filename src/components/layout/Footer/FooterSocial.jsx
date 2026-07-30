import Link from "next/link";

export default function FooterSocial({
  socials,
}) {
  return (
    <div className="mt-8 flex gap-4">

      {socials.map((item,index)=>{

        const Icon=item.icon;

        return(

          <Link
            key={index}
            href={item.href}
            className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            transition
            hover:bg-primary
            "
          >

            <Icon size={18}/>

          </Link>

        )

      })}

    </div>
  );
}