"use client"

import * as React from "react"
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"





export default function RelatedCarousel(props: any) {

  const [Contents, setContents]: any = useState({});

  function fetchData(tagsId: any, categoriesId: any) {


    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    };

    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/contents?populate=*`;

    url += `&sort[0]=createdAt:desc`;

    const finalUrl = url;
    fetch(finalUrl, options)
      .then(res => res.json())
      .then(data => {
        setContents(data);
      }).catch((error) => console.error(error));


  }

  useEffect(() => {
    fetchData(props.tagsId, props.categoriesId)
  }, [])



  const contents = Contents.data;
  console.log("contents")
  console.log(contents)
  console.log("contents")

  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative my-12 mx-auto"
      >
        <CarouselContent className="-ml-4">
          {contents?.map((content: any, index: any) => (

            <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
              <Link className="w-96" href={"/contents/" + content.id}>
                <div className="overflow-hidden object-cover object-center h-full w-full p-1">
                  <Image
                    src={process.env.NEXT_PUBLIC_API_URL + "" + content.attributes.cover.data.attributes.url}
                    width={1200}
                    height={1200}
                    alt={content.attributes.cover.data.attributes.alternativeText}
                    className="transition group-hover:scale-110 object-cover object-center h-full w-full duration-300"
                  />
                </div>
              </Link>
            </CarouselItem>

          ))}


        </CarouselContent>
        <CarouselPrevious className="left-[-16px] w-10 h-10 shadow-md text-primary" />
        <CarouselNext className="right-[-16px] w-10 h-10 shadow-md text-primary" />
      </Carousel>
    </>
  )
}
