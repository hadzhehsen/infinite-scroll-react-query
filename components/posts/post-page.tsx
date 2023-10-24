import Image from "next/image";
import Link from "next/link";

export function PostPage({ title, content, image, date }: any) {
  return (
    <div className="container mx-auto py-4 px-4">
      <div className="py-6 max-w-2xl">
        <div className="flex flex-col gap-[12px]">
          {image && (
            <div className="relative h-[250px] w-[250px] overflow-hidden rounded-[12px] border-[1px] border-[#2F2F2F] flex-initial">
              <Image src={image} fill alt="" loading="lazy" />
            </div>
          )}
          {title && <h1 className="uppercase font-mono font-bold">{title}</h1>}
          {date && <div>{(date as Date).toLocaleString()}</div>}
          {content && <div>{content}</div>}
        </div>
        <div className="pt-4">
          <Link href="/news" className="underline text-green-300">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
