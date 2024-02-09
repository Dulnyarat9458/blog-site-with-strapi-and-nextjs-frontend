import * as React from "react"
import Image from "next/image";
import Link from "next/link";

export function LastedGridView(props: any) {
  return (
    <div className="w-full grid md:grid-cols-4 gap-4">
      {
        props.contentData.map((content: any, index: number) => (
          <div className={`relative aspect-square ${(index == 0) ? 'col-span-2 row-span-2' : ''}`}>
            <Link href={"content/" + content.id} className="point-cursor">
              <Image
                src={"http://localhost:1337"
                  + content.attributes.thumbnail.data.attributes.formats.large.url}
                width={1200}
                height={1200}
                alt={content.attributes.thumbnail.data.attributes.alternativeText}
                className="object-cover object-center h-full w-full"
              />
              <div
                className="duration-300 group w-full h-full flex justify-center items-end absolute bottom-0 text-center text-xl font-semibold p-4 
                bg-gradient-to-t
              from-black/90 from-10% via-black/50 via-70% to-black/0 transition-all hover:bg-black/50 ">
                <div className="text-white duration-300 transition-all absolute bottom-8 group-hover:bottom-1/2 group-hover:translate-y-1/2 group-hover:text-primary">
                  {content.attributes.name}
                </div>
              </div>
            </Link>
          </div>
        ))
      }
    </div >
  )
}
