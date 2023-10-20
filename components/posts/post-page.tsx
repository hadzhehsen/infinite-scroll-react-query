import Image from 'next/image';

export function PostPage({ title, description, image }: any) {
  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center w-[300px] gap-[12px] text-center">
        <h1 className="uppercase font-mono font-bold">{title && title}</h1>
        <p>{description && description}</p>
        <div className="relative h-[250px] w-[250px] w-full overflow-hidden rounded-[12px] border-[1px] border-[#2F2F2F]">
          <Image
            src={image?.src}
            fill
            alt=""
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
