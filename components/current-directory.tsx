'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function CurrentDirectory(props: any) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  pathSegments.pop();

  return (
    <div className='p-5 my-5 border border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 '>
      <p>
        <Link href="/" className='duration-20  hover:text-primary'>home</Link>
        <span className='inline mx-2'>/</span>
        <Link href={`/${pathSegments}`} className='duration-200 hover:text-primary'>
          {pathSegments}
        </Link>
        <span className='inline mx-2'>/</span>
        <Link href="#" className='duration-20  hover:text-primary'>{props.title}</Link>
      </p>
    </div>
  );
}
