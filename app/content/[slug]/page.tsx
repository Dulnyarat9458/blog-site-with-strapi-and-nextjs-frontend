import Image from "next/image";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';


async function getData(slug: string) {
  const res = await fetch(`http://localhost:1337/api/restaurants/${slug}?populate=thumbnail`);
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home({ params }: { params: { slug: string } }) {

  const content = await getData(params.slug);
  console.log(content.data)


  return (

    <div>
      <div className="mb-12">
        <h1 className="text-center mx-auto font-bold text-4xl mt-14 mb-5">{content.data.attributes.name}</h1>
        <div className="flex justify-center items-center mx-auto">
          <Image
            src={"http://localhost:1337"
              + content.data.attributes.thumbnail.data.attributes.url}
            layout="responsive"
            objectFit="contain"
            alt={content.data.attributes.thumbnail.data.attributes.alternativeText}
            className="max-w-xl w-full h-11"
            width={16}
            height={9}
          />
        </div>
      </div>

      <div>
        <BlocksRenderer content={content.data.attributes.description} />
      </div>
    </div>

  );
}
