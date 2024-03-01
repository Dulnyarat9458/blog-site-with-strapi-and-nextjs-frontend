"use client"

import { useEffect, forwardRef, useState } from "react"

export function CurrentFilter(props: any) {

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
          arrCat[value.id] = value.attributes.name;
        })
        setCategories(arrCat)
        console.log(arrCat)
      }).catch((error) => console.error(error));
    fetch(urlTag, requestOptions)
      .then(response => response.json())
      .then(data => {
        data.data.map((value: any, index: number) => {
          arrTag[value.id] = value.attributes.name;
        })
        setTags(arrTag)
      }).catch((error) => console.error(error));
  }

  useEffect(() => {
    getInitialValue();
  }, [])

  const categoryList = (props.categories).split(',');
  const tagList = (props.tags).split(',');

  return (
    <>
      <div>
        <span className="font-semibold mr-2 text-xl">Keyword:</span>
        <span className="text-xl">{props.keyword}</span>
        
      </div>
      <div>
        <span className="font-semibold text-xl">Categories:</span>
        {
          categoryList.map((element: number, index: number) => (
            <div key={index} className="inline ml-2 text-xl">
              {categories[element]}
              {index < categoryList.length - 1 && ','}
            </div>
          ))
        }
      </div>
      <div>
        <span className="font-semibold text-xl">Tags:</span>
        {
          tagList.map((element: number, index: number) => (
            <div key={index} className="inline ml-2 text-xl">
              {tags[element]}
              {index < tagList.length - 1 && ','}
            </div>
          ))
        }
      </div>
    </>
  )
}
