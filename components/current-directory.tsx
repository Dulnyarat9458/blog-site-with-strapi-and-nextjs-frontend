'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function CurrentDirectory() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <div className='p-5 my-5 border border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 '>
      <p>
        <Link href="/" className='duration-20  hover:text-primary'>Home</Link>
        {pathSegments.map((segment, index) => {
          const pathToSegment = `/${pathSegments.slice(0, index + 1).join('/')}`;
          return (
            <span key={index}>
              <span className='mx-2'>/</span>
              <Link href={pathToSegment} className='duration-200 hover:text-primary'>
                {segment}
              </Link>
            </span>
          );
        })}
      </p>
    </div>
  );
}
