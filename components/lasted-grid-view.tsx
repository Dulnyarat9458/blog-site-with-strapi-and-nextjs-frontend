import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Categories {
  data: Array<{
    id: number;
    attributes: {
      name: string
    }
  }>
}

interface Cover {
  data: {
    attributes: {
      url: string;
      alternativeText: string;
    };
  };
}

interface Content {
  id: string;
  attributes: {
    cover: Cover;
    categories: Categories;
    name: string;
  };
}

interface LastedGridViewProps {
  contentData: {
    data: Content[]
  };
}

export function LastedGridView(props: LastedGridViewProps) {
  const { contentData } = props;
  return (
    <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {contentData.data.map((content: Content, index: number) => (
        <div key={index} className="relative aspect-square">
          <Link href={`/contents/${content.id}`} className="group cursor-pointer">
            <div className="overflow-hidden object-cover object-center h-full w-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${content.attributes.cover.data.attributes.url}`}
                width={1200}
                height={1200}
                alt={content.attributes.cover.data.attributes.alternativeText}
                className="transition group-hover:scale-110 object-cover object-center h-full w-full duration-300"
                placeholder='empty'
              />
            </div>
            <div
              className="duration-300 w-full h-full flex justify-center items-end absolute bottom-0 text-center text-xl font-semibold p-4 
              bg-gradient-to-t from-black/70 from-20% via-black/30 via-70% to-black/0 transition-all hover:bg-black/50"
            >
              <div className="p-1 text-white duration-300 transition-all absolute bottom-4 group-hover:bottom-1/2 group-hover:translate-y-1/2 group-hover:text-primary">
              &quot;{content.attributes.name}&quot;
                {
                  <div className='whitespace-nowrap truncate opacity-0 group-hover:opacity-100 duration-200 text-primary'>
                    {content.attributes.categories.data.map((category, index) => (
                      <div key={index} className="inline text-sm whitespace-nowrap truncate">{category.attributes.name}{content.attributes.categories.data.length - 1 === index ? "" : ", "}</div>
                    ))
                    }
                  </div>
                }
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
