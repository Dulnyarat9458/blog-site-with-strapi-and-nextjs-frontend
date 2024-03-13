import * as React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Link } from "lucide-react";



async function getData(tagsId:any,categoriesId:any) {

  let arrCategory;
  let arrTag;

  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  };

  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/contents?populate=*`;

  console.log("=====")
  // console.log(categoriesId)
  console.log(tagsId)
  console.log("=====")
  
  // if (categoriesId && categoriesId !== undefined) {

  //   categoriesId.map((id: number, index: number) => {
  //     url += `&filters[categories][id][$in][${index}]=${id}`
  //   });

  // }

  // if (tagsId && tagsId !== undefined) {
  //   // arrTag = tagsId.split(",");
  //   tagsId.map((id: number, index: number) => {
  //     url += `&filters[tags][id][$in][${index}]=${id}`
  //   });
  // }


  url += `&sort[0]=createdAt:desc`;

  const finalUrl = url;
  const res = await fetch(finalUrl, options)

  console.log(finalUrl)

  if (!res.ok) {
    throw new Error('That content can’t be found.')
  }
  return res.json()
}

export default async function RelatedCarousel(props:any)  {
  console.log(props.tagsId)
  console.log(props.categoriesId)

  const contents = await getData(props.tagsId,props.categoriesId);

  console.log("==")
  console.log(contents)
  console.log("==")

  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative my-12 mx-auto"
      >
        <CarouselContent>
          {contents.data.map((content:any, index:any) => (
            // <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/4 xl:basis-1/5">
            //   <div className="p-1">
            //     <Card>
            //       <CardContent className="flex aspect-square items-center justify-center p-6">
            //         <span className="text-3xl font-semibold">{index + 1}</span>
            //       </CardContent>
            //     </Card>
            //   </div>
            // </CarouselItem>

            <Link href={"/contents/" + content.id}>
              <Card className="h-full border-border duration-200 hover:border-primary hover:text-primary">
                <CardHeader className="p-0">
                  {/* <Image
                    src={process.env.NEXT_PUBLIC_API_URL + "" + content.attributes.cover.data.attributes.url}
                    layout="responsive"
                    alt={content.attributes.cover.data.attributes.alternativeText}
                    className="w-full aspect-square object-cover rounded-t-lg"
                    width={1200}
                    height={1200}
                  /> */}
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl">{content.attributes.name}</CardTitle>
                  <CardDescription></CardDescription>
                </CardContent>
                <CardFooter>
                </CardFooter>
              </Card>
          </Link>
          ))}

          
        </CarouselContent>
        <CarouselPrevious className="left-[-16px] w-10 h-10 shadow-md text-primary" />
        <CarouselNext className="right-[-16px] w-10 h-10 shadow-md text-primary" />
      </Carousel>
    </>

  )
}
