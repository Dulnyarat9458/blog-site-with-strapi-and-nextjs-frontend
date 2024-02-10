import { LastedGridView } from "@/components/lasted-grid-view"

async function getData() {
  console.log(process.env.API_URL)
  const res:any = await fetch(`${process.env.API_URL}/api/contents?populate=cover&sort[0]=createdAt:desc&pagination[limit]=5`)
  console.log(res.status)
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
