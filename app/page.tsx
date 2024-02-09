import { LastedGridView } from "@/components/lasted-grid-view"

async function getData() {
  const res = await fetch('http://localhost:1337/api/restaurants?populate=thumbnail&sort[0]=publishedAt:desc')
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
