import { LastedGridView } from "@/components/lasted-grid-view"

async function getData() {

  const options: any = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  const res = await fetch(`${process.env.API_URL}/api/contents?populate=cover&sort[0]=createdAt:desc&pagination[limit]=5`, options)

  console.log(res)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home() {
  const contents = await getData();
  return (
    <>
      <h1 className="text-center mx-auto font-bold text-4xl mt-14 mb-5">HIGHLIGTH</h1>
      <LastedGridView contentData={contents.data} />
    </>
  );
}
