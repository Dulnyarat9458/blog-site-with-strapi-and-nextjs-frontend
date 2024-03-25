import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
interface Props {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}


interface Categories {
  data: Array<{
    attributes: {
      name: string
    }
  }>
}


interface Contents {
  data: {
    attributes: {
      contents: {
        data: Array<{
          id: string;
          attributes: {
            cover: {
              data: {
                attributes: {
                  url: string;
                  alternativeText: string;
                }
              }
            },
            name: string;
            categories: Categories;
          };
        }>;
      }
      name: string;
    }
  }


}


// interface Content {
//   id: string;
//   attributes: {
//     cover: {
//       data: {
//         attributes: {
//           url: string;
//           alternativeText: string;
//         }
//       }
//     },
//     name: string;
//     categories: Categories;
//   };
// }

async function getData(slug: string) {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  };
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/tags/${slug}?populate[contents][populate]=*`
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error('That content can’t be found.')
  }
  return res.json()
}

export default async function TagsPage(props: Props) {
  const contents: Contents = await getData(props.params.slug);
  return (
    <div>
      <div className="mb-12">
        <h1 className="text-center mx-auto font-bold text-4xl mt-14 mb-5">Tag: {contents.data.attributes.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {
            contents.data.attributes.contents.data.map(
              (content, index) => {
                return (
                  <Link key={index} href={"/contents/" + content.id}>
                    <Card className="h-full border-border duration-200 hover:border-primary hover:text-primary group flex flex-col">
                      <CardHeader className="p-0">
                        <div className="aspect-square w-full h-auto overflow-hidden rounded-t-lg">
                          <Image
                            src={process.env.NEXT_PUBLIC_API_URL + "" + content.attributes.cover.data.attributes.url}
                            layout="responsive"
                            alt={content.attributes.cover.data.attributes.alternativeText}
                            className="w-full aspect-square object-cover rounded-t-lg duration-300 transition group-hover:scale-110"
                            width={1200}
                            height={1200}
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="px-4 pt-4 pb-6 flex-1 relative">
                        <CardTitle className="text-xl mb-1">{content.attributes.name}</CardTitle>
                        {
                          content.attributes.categories.data.map((category, index) => (
                            <div key={index} className="inline mr-2 whitespace-nowrap truncate">{category.attributes.name}{content.attributes.categories.data.length - 1 === index ? "" : ", "}</div>
                          ))
                        }
                        <div className="mt-2 bottom-0 h-2 z-40"></div>
                        <div className="h-1 w-0 group-hover:w-[calc(100%-32px)] bg-primary duration-300 absolute bottom-4"></div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              }
            )
          }
        </div>
      </div>
    </div>
  );
}
