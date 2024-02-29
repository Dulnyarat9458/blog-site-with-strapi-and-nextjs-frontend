import Link from "next/link";

export default function Custom404() {
  return <div className='min-h-screen-58 w-full flex flex-col justify-center items-center'>
    <h2 className='mb-8'>404 - Page Not Found</h2>
    <Link href="/" className='text-primary duration-200 hover:brightness-75'>return to home page</Link>
  </div>
}
