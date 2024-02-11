import Image from "next/image";
import { Metadata, ResolvingMetadata } from 'next'
import { BlocksRenderer } from '@strapi/blocks-react-renderer';


type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug
  const options: any = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };
  const res: any = await fetch(`http://localhost:1339/api/contents/${slug}?populate=cover`, options);
  const contents = await res.json();
  return {
    title: contents.data.attributes.name,
    description: contents.data.attributes.description,
  }
}

async function getData(slug: string) {

  const options: any = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  const res: any = await fetch(`http://localhost:1339/api/contents/${slug}?populate=cover`, options);
  if (!res.ok) {
    throw new Error('That content can’t be found.')
  }
  return res.json()
}

export default async function ContentPage({ params, searchParams }: Props) {
  const content = await getData(params.slug);
  return (
    <div>
      <div className="mb-12">
        <h1 className="text-center mx-auto font-bold text-4xl mt-14 mb-5">{content.data.attributes.name}</h1>
        <div className="flex justify-center items-center mx-auto">
          <Image
            src={"http://localhost:1339"
              + content.data.attributes.cover.data.attributes.url}
            layout="responsive"
            objectFit="contain"
            alt={content.data.attributes.cover.data.attributes.alternativeText}
            className="max-w-xl w-full h-11"
            width={16}
            height={9}
          />
        </div>
      </div>
      <div>
        <BlocksRenderer content={content.data.attributes.block} />
      </div>
    </div>
  );
}
