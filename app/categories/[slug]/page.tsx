import Image from "next/image";
import { Metadata, ResolvingMetadata } from 'next'
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Link from "next/link";


type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getData(slug: string) {

  const options: any = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  };

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${slug}?populate[contents][populate][cover]=*`
  const res: any = await fetch(url, options);

  if (!res.ok) {
    throw new Error('That content can’t be found.')
  }

  return res.json()
}

export default async function ContentPage(props: Props) {
  const contents = await getData(props.params.slug);

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-center mx-auto font-bold text-4xl mt-14 mb-5">{contents.data.attributes.name}</h1>
        {
          contents.data.attributes.contents.data.map(
            (content: any) => {
              return (
                <Link  href={"/contents/"+content.id}>
                  <Image
                    src={process.env.NEXT_PUBLIC_API_URL + "" + content.attributes.cover.data.attributes.url}
                    layout="responsive"
                    objectFit="contain"
                    alt={content.attributes.cover.data.attributes.alternativeText}
                    className="max-w-xl w-full h-11"
                    width={16}
                    height={9}
                  />
                  <div className="text-start mb-4">{content.attributes.name}</div>
                </Link>
              )
            }
          )
        }

        {/* <Image
            src={process.env.NEXT_PUBLIC_API_URL+""+ content.data.attributes.cover.data.attributes.url}
            layout="responsive"
            objectFit="contain"
            alt={content.data.attributes.cover.data.attributes.alternativeText}
            className="max-w-xl w-full h-11"
            width={16}
            height={9}
          /> */}
      </div>

      {/* <div>
        <BlocksRenderer content={content.data.attributes.block} />
      </div> */}
    </div>
  );
}
