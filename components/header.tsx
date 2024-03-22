"use client"

import { AlignJustify, X, Search, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DarkModeToggle } from "@/components/darkmode-toggle"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
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

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export function Header() {

  interface Category {
    id: number,
    attributes: {
      name: string
    }
  }

  const router = useRouter();
  const { theme, setTheme } = useTheme()
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const [isMobileDarkMode, setIsMobileDarkmode] = useState(false);

  const formSchema = z.object({
    keyword: z.string(),
    categories: z.array(z.number()),
    tags: z.array(z.number()),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
      categories: [],
      tags: [],
    },
  })


  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const categoryList = (values.categories).join(',');
    const tagList = (values.tags).join(',');
    setOpenSearch(false);
    router.push(`/contents?keyword=${values.keyword}&category=${categoryList}&tag=${tagList}`);
  }

  const resetForm = () => {
    form.resetField("keyword");
    form.resetField("categories");
    form.resetField("tags");
  }


  const getInitialValue = () => {
    const urlCategories = `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
    const urlTag = `${process.env.NEXT_PUBLIC_API_URL}/api/tags`
    const requestOptions: any = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    };

    fetch(urlCategories, requestOptions)
      .then(response => response.json())
      .then(data => {
        setCategories(data.data)
        console.log(data.data)
      }).catch((error) => console.error(error));

    fetch(urlTag, requestOptions)
      .then(response => response.json())
      .then(data => {
        setTags(data.data)
      }).catch((error) => console.error(error));
  }

  const openSidebar = () => {
    setIsSideOpen(true);
  }

  const closeSidebar = () => {
    setIsSideOpen(false);
  }

  const checkDarkInit = () => {
    if (theme === 'dark') {
      setIsMobileDarkmode(true);
    } else {
      setIsMobileDarkmode(false);
    }
  }

  const changeMode = () => {
    if (theme === 'dark') {
      setTheme('light');
      setIsMobileDarkmode(false);
    } else {
      setTheme('dark');
      setIsMobileDarkmode(true);
    }
  }

  useEffect(() => {
    getInitialValue();
    checkDarkInit();
  }, [])

  return (
    <>
      <nav className="sticky top-0 z-50 py-2 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-foreground">FOODVIEW</Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Dialog open={openSearch} onOpenChange={setOpenSearch}>
                  <DialogTrigger asChild>
                    <Button className="w-10 p-0" variant="outline"><Search /></Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Search</DialogTitle>
                      <DialogDescription>
                        find your target
                      </DialogDescription>
                    </DialogHeader>
                    <Separator orientation="horizontal" />
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                          control={form.control}
                          name="keyword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Keyword</FormLabel>
                              <FormControl>
                                <Input placeholder="keyword..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="categories"
                          render={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel className="text-base">Categories</FormLabel>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2">
                                {categories.map((category: any) => (
                                  <FormField
                                    key={category.id}
                                    control={form.control}
                                    name="categories"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={category.id}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(category.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, category.id])
                                                  : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== category.id
                                                    )
                                                  )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="text-sm font-normal">
                                            {category.attributes.name}
                                          </FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="tags"
                          render={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel className="text-base">Tag</FormLabel>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2">
                                {tags.map((tag: any) => (
                                  <FormField
                                    key={tag.id}
                                    control={form.control}
                                    name="tags"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={tag.id}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(tag.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, tag.id])
                                                  : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== tag.id
                                                    )
                                                  )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="text-sm font-normal">
                                            {tag.attributes.name}
                                          </FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end items-center">
                          <Button type="button" onClick={resetForm} className="p-4 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent text-accent-foreground"><RotateCcw /></Button>
                        </div>
                        <Separator orientation="horizontal" />
                        <DialogFooter className="sm:justify-center">
                          <Button type="submit" className="w-full">Submit</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </NavigationMenuItem>
              <NavigationMenuItem className="flex md:hidden">
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
                  <ul className="w-full min-w-52">
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
              onCheckedChange={changeMode}
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
          <div className="overflow-y-auto h-[85%]">
            <ul className="w-full overflow-y-auto">
              {
                categories?.map((category: Category, index: number) => {
                  return (
                    <Link key={index} href={`/categories/${category.id}`} onClick={closeSidebar}>
                      <li className="my-5" >{category.attributes.name} </li>
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
