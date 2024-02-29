"use client"

import { AlignJustify, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DarkModeToggle } from "@/components/darkmode-toggle"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useTheme } from "next-themes"

import Link from "next/link"

import { useEffect, forwardRef, useState } from "react"

import { cn } from "@/lib/utils"


export function Header() {
  interface Category {
    id: number,
    attributes: {
      name: string
    }
  }


  const [categories, setCategories] = useState([]);
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isMobileDarkMode, setIsMobileDarkmode] = useState(false);
  const { setTheme } = useTheme()

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

  useEffect(() => {
    if (isMobileDarkMode) {
      setTheme('dark')
    } else {
      setTheme('light')
    }

  }, [isMobileDarkMode])

  const openSidebar = () => {
    setIsSideOpen(true);
  }
  const closeSidebar = () => {
    setIsSideOpen(false);
  }

  return (
    <>
      <nav className="sticky top-0 z-50 py-2 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-foreground">MYSITE</Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="block md:hidden">
                <Button variant="outline" size="icon" onClick={openSidebar}>
                  <AlignJustify className="absolute h-[1.2rem] w-[1.2rem]" />
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden md:block">
                <DarkModeToggle />
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden md:block">
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-full">
                    {
                      categories?.map((category: Category, index: number) => {
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
      <div className={`fixed overflow-hidden top-0 z-[100] w-full bg-background duration-300 ${isSideOpen ? 'h-full' : 'h-0'}`}>
        <div className="h-full p-8">
          <div className="flex items-center space-x-2 justify-center mb-4">
            <Switch
              id="dark-mode-switch"
              checked={isMobileDarkMode}
              onCheckedChange={setIsMobileDarkmode}
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
          <div className="overflow-y-auto h-[85%]">
            <ul className="w-full overflow-y-auto">
              {
                categories?.map((category: Category, index: number) => {
                  return (
                    <Link href={`/categories/${category.id}`} onClick={closeSidebar}>
                      <li className="my-5" key={index}>{category.attributes.name} </li>
                    </Link>
                  );
                }) || <p>Loading...</p>
              }
            </ul>
          </div>
          <div className="flex items-center space-x-2 justify-center">
            <Button variant="outline" size="icon" onClick={closeSidebar}>
              <X className="absolute h-[1.2rem] w-[1.2rem]" />
            </Button>
          </div>
        </div>
      </div>
    </>
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
