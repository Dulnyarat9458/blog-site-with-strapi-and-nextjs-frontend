import Link from "next/link";
import Image from "next/image";
import { PaginationMain } from "@/components/pagination";
import { CurrentFilter } from "@/components/current-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ContentAttributes {
  cover: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      }
    }
  },
  categories: Categories,
  name: string;
}

interface Categories {
  data: Array<{
    attributes: {
      name: string
    }
  }>
}

interface Content {
  data: Array<{
    id: string;
    attributes: ContentAttributes;
  }>;
  meta: {
    pagination: {
      page: number,
      pageSize: number,
      pageCount: number
      total: number;
    }
  }
}

interface SearchParams {
  keyword: string;
  category: string;
  tag: string;
  page: number;
}

interface Props {
  searchParams: SearchParams
}

async function getLastedData(searchParams: SearchParams) {
  const keyword = searchParams.keyword;
  const category = searchParams.category;
  const tag = searchParams.tag;
  const currentPage = searchParams.page;
  const pageSize = 12;

  let arrCategory;
  let arrTag;

  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  };

  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/contents?populate=*`;

  if (keyword && keyword !== undefined) {
    url += `&filters[name][$contains]=${keyword}`
  }

  if (category && category !== undefined) {
    arrCategory = category.split(",");
    arrCategory.map((id, index) => {
      url += `&filters[categories][id][$in][${index}]=${id}`
    });
  }

  if (tag && tag !== undefined) {
    arrTag = tag.split(",");
    arrTag.map((id, index) => {
      url += `&filters[tags][id][$in][${index}]=${id}`
    });
  }

  url += `&sort[0]=createdAt:desc&pagination[pageSize]=${pageSize}`;

  if (currentPage && currentPage !== undefined) {
    url += `&pagination[page]=${currentPage}`;
  } else {
    url += `&pagination[page]=1`;
  }

  const finalUrl = url;
  const res = await fetch(finalUrl, options)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function TagsPage(props: Props) {
  const contents: Content = await getLastedData(props.searchParams);
  return (
    <div>
      <div>
        <CurrentFilter keyword={props.searchParams.keyword} categories={props.searchParams.category} tags={props.searchParams.tag} />
      </div>
      <div className="mb-12">
        <h1 className="text-center mx-auto font-bold text-4xl mt-14 mb-5">Contents</h1>
        {
          contents.data.length !== 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-16">
            {
              contents.data.map(
                (content,index) => {
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
          </div>) : (<div className="flex justify-center items-center h-28">Sorry, but nothing matched your filter. Please try again with some different keywords.</div>)
        }
        <div className="my-8">
          <PaginationMain paginationValue={contents.meta.pagination} />
        </div>
      </div>
    </div>
  );
}
