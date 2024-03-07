"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { usePathname, useSearchParams } from 'next/navigation';

export function PaginationMain({ paginationValue }: any) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        {
          paginationValue.page !== 1 && (
            <>
              <PaginationItem>
                <PaginationPrevious href={createPageURL(1)} />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious href={createPageURL(paginationValue.page - 1)} />
              </PaginationItem>
            </>

          )
        }

        {
          paginationValue.pageCount <= 5 ?
            [...Array(paginationValue.pageCount)].map((_, index: number) =>
              <PaginationItem key={index}>
                {
                  index + 1 === paginationValue.page ? (
                    <PaginationLink href={createPageURL(index + 1)} isActive>
                      {index + 1}
                    </PaginationLink>
                  ) : (
                    <PaginationLink href={createPageURL(index + 1)}>
                      {index + 1}
                    </PaginationLink>
                  )
                }
              </PaginationItem>
            )
            : (paginationValue.page >= 4 && paginationValue.pageCount - paginationValue.page > 2)
              ? [...Array(5)].map((_, index: number) =>
                <PaginationItem key={index}>
                  {
                    index + 1 - 2 + paginationValue.page === paginationValue.page ? (
                      <PaginationLink href={createPageURL(index + 1 - 2 + paginationValue.page)} isActive>
                        {index + 1 - 2 + paginationValue.page}
                      </PaginationLink>
                    ) : (
                      <PaginationLink href={createPageURL(index + 1 - 2 + paginationValue.page)}>
                        {index + 1 - 2 + paginationValue.page}
                      </PaginationLink>
                    )
                  }
                </PaginationItem>
              ) : paginationValue.page <= 3
                ?
                [...Array(5)].map((_, index: number) =>
                  <PaginationItem key={index}>
                    {
                      index + 1 === paginationValue.page ? (
                        <PaginationLink href={createPageURL(index + 1)} isActive>
                          {index + 1}
                        </PaginationLink>
                      ) : (
                        <PaginationLink href={createPageURL(index + 1)}>
                          {index + 1}
                        </PaginationLink>
                      )
                    }
                  </PaginationItem>
                )
                :
                [...Array(5)].map((_, index: number) =>
                  <PaginationItem key={index}>
                    {
                      index + 1 + (paginationValue.pageCount - 5) === paginationValue.page ? (
                        <PaginationLink href={createPageURL(index + 1 + (paginationValue.pageCount - 5))} isActive>
                          {index + 1 + (paginationValue.pageCount - 5)}
                        </PaginationLink>
                      ) : (
                        <PaginationLink href={createPageURL(index + 1 + (paginationValue.pageCount - 5))}>
                          {index + 1 + (paginationValue.pageCount - 5)}
                        </PaginationLink>
                      )
                    }
                  </PaginationItem>
                )
        }
        {
          paginationValue.page !== paginationValue.pageCount && (
            <PaginationItem>
              <PaginationNext href={createPageURL(paginationValue.page + 1)} />
            </PaginationItem>
          )
        }
      </PaginationContent>
    </Pagination>
  )
}
