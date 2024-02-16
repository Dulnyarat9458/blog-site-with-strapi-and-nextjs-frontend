"use client"

import { useEffect, forwardRef, useState } from "react"
import Link from "next/link"
import { DarkModeToggle } from "@/components/darkmode-toggle"
import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport
} from "@/components/ui/navigation-menu"

export function Header() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const requestOptions: any = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    };
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        setCategories(data.data)
      }).catch((error) => console.error(error));
  }, [])

  return (
    <nav className="sticky top-0 z-50 py-2 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">MYSITE</Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <DarkModeToggle />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-full">
                  {
                    categories?.map((category: any, index: number) => {
                      return (
                        <ListItem key={index} href={`/categories/${category.id}`} title={category.attributes.name} />
                      );
                    }) || <p>Loading...</p>
                  }
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
