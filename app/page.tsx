import { HighlightGridView } from "@/components/highlight-grid-view"
import { LastedGridView } from "@/components/lasted-grid-view";
import Link from "next/link";

async function getHighlightData() {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  };
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/highlights?populate[content][populate][cover]=cover&sort[0]=createdAt:desc&pagination[limit]=5`;
  const res = await fetch(url, options)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

async function getLastedData() {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  };
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/contents?populate=cover&sort[0]=createdAt:desc&pagination[limit]=12`;
  const res = await fetch(url, options)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home() {
  const highlightData = await getHighlightData();
  const lastedData = await getLastedData();
  return (
    <>
      <h1 className="text-center mx-auto font-bold text-4xl mt-14 mb-5">HIGHLIGHT</h1>
      <HighlightGridView contentData={highlightData} />
      <div className="my-8"></div>
      <div className="flex justify-between items-center mt-14 mb-4">
        <h1 className="font-bold text-4xl">LASTED</h1>
        <Link href='/contents' className="text-lg font-semibold text-primary duration-300 hover:text-xl">MORE</Link>
      </div>
      <LastedGridView contentData={lastedData} />
    </>
  );
}
