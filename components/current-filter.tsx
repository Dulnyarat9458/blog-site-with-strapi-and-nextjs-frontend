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

export function CurrentFilter(props:any) {

  interface Category {
    id: number,
    attributes: {
      name: string
    }
  }


  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [isSideOpen, setIsSideOpen] = useState(false);



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

    let arrCat: any = {};
    let arrTag: any = {};

    fetch(urlCategories, requestOptions)
      .then(response => response.json())
      .then(data => {
        data.data.map((value: any, index: number) => {
          arrCat[value.id] = value.attributes.name ;
        })
        setCategories(arrCat)
        console.log(arrCat)
      }).catch((error) => console.error(error));

    fetch(urlTag, requestOptions)
      .then(response => response.json())
      .then(data => {
        data.data.map((value: any, index: number) => {
          arrTag[value.id] = value.attributes.name ;
        })
      }).catch((error) => console.error(error));


  }

  const openSidebar = () => {
    setIsSideOpen(true);
  }

  const closeSidebar = () => {
    setIsSideOpen(false);
  }

  useEffect(() => {
    getInitialValue();
  }, [])

  const categoryList = (props.categories).split(',');
  const tagList = (props.tags).split(',');

  return (
    <>
    <div className="text-3xl">super test</div>
 
    </>
  )
}
