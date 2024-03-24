"use client"

import * as React from "react"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator";

export default function RelatedCarousel(props: any) {

  interface Contents {
    data: Array<{
      id: number;
      attributes: any;
    }>
  }

  const [Contents, setContents]: any = useState();

  function fetchData(tagsId: number[], categoriesId: number[], cid: number) {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    };

    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/contents?populate=*`;

    if (categoriesId && categoriesId !== undefined) {
      categoriesId.map((id: number, index: number) => {
        url += `&filters[$or][0][categories][$or][${index}][id][$eq]=${id}`
      });
    }

    if (tagsId && tagsId !== undefined) {
      tagsId.map((id: number, index: number) => {
        url += `&filters[$or][1][tags][$or][${index}][id][$eq]=${id}`
      });
    }

    url += `&filters[id][$ne]=${cid}&pagination[limit]=10&sort[0]=createdAt:desc`;

    const finalUrl = url;

    fetch(finalUrl, options)
      .then(res => res.json())
      .then(data => {
        if (data.data.length !== 0) {
          setContents(data);
        } else {
          let allContentUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/contents?populate=*&filters[id][$ne]=${cid}&pagination[limit]=10&sort[0]=createdAt:desc`;
          fetch(allContentUrl, options)
            .then(res => res.json())
            .then(data => {
              setContents(data);
              console.log("===test===")
              console.log(data);
              console.log("==========")
            }).catch((error) => console.error(error));
        }
      }).catch((error) => console.error(error));
  }

  useEffect(() => fetchData(props.tagsId, props.categoriesId, props.cid), [])
  return (
    <div className="my-12">
      <Separator />
      <h3 className="font-bold text-2xl my-4">You may also be interested</h3>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative mx-auto"
      >
        {
          Contents ?
            <div>
              <CarouselContent className="-ml-4">
                {Contents.data?.map((content: any, index: any) => (
                  <CarouselItem key={index} className="relative aspect-square basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                    <Link href={"/contents/" + content.id} className="group point-cursor">
                      <div className="overflow-hidden object-cover object-center h-full w-full">
                        <Image
                          src={process.env.NEXT_PUBLIC_API_URL + "" + content.attributes.cover.data.attributes.url}
                          width={1200}
                          height={1200}
                          alt={content.attributes.cover.data.attributes.alternativeText}
                          className="transition group-hover:scale-110 object-cover object-center h-full w-full duration-300"
                        />
                      </div>
                      <div
                        className="duration-300  w-[calc(100%_-_16px)]  h-full flex justify-center items-end absolute bottom-0 text-center font-semibold
          bg-gradient-to-t from-black/70 from-20% via-black/30 via-70% to-black/0 transition-all hover:bg-black/50 ">
                        <div className="p-1 text-white duration-300 transition-all absolute bottom-4 group-hover:bottom-1/2 group-hover:translate-y-1/2 group-hover:text-primary">
                          "{content.attributes.name}"
                          <div className="whitespace-nowrap truncate opacity-0 group-hover:opacity-100 duration-200 text-primary">
                            {content.attributes.categories.data.map((category: any, index: number) => (
                              <div className="inline text-sm whitespace-nowrap truncate">{category.attributes.name}{content.attributes.categories.data.length - 1 === index ? "" : ", "}</div>
                            ))
                            }
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent></div>
            : <div>No data</div>
        }
        <CarouselPrevious className="left-[-20px] w-10 h-10 shadow-md text-primary disabled:opacity-0" />
        <CarouselNext className="right-[-20px] w-10 h-10 shadow-md text-primary disabled:opacity-0" />
      </Carousel>
    </div>
  )
}
