"use client";

import { useEffect, useState } from "react"

interface Props {
  keyword: string;
  categories: string;
  tags: string;
}

interface Categories {
  data: Array<{
    id: number,
    attributes: {
      name: string
    }
  }>
}

interface Tags {
  data: Array<{
    id: number,
    attributes: {
      name: string
    }
  }>
}

export function CurrentFilter(props: Props) {
  const [categories, setCategories] = useState<{ [key: number]: string }>([]);
  const [tags, setTags] = useState<{ [key: number]: string }>([]);

  const getInitialValue = () => {
    const urlCategories = `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
    const urlTag = `${process.env.NEXT_PUBLIC_API_URL}/api/tags`
    const requestOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    };
    let arrCat: { [key: number]: string };
    let arrTag: { [key: number]: string };
    fetch(urlCategories, requestOptions)
      .then(response => response.json())
      .then((data: Categories) => {
        data.data.map((cat, _) => {
          arrCat[cat.id] = cat.attributes.name;
        })
        setCategories(arrCat)
      }).catch((error) => console.error(error));
    fetch(urlTag, requestOptions)
      .then(response => response.json())
      .then((data: Tags) => {
        data.data.map((tag, _) => {
          arrTag[tag.id] = tag.attributes.name;
        })
        setTags(arrTag)
      }).catch((error) => console.error(error));
  }

  useEffect(() => {
    getInitialValue();
  }, [])

  const keyword = props.keyword;
  const categoryList = props.categories !== "" && props.categories !== undefined ? props.categories.split(',') : [];
  const tagList = props.tags !== "" && props.tags !== undefined ? props.tags.split(',') : [];

  return (
    <>
      {
        keyword && (
          <div>
            <span className="font-semibold mr-2 text-xl">Keyword:</span>
            <span className="text-xl">{props.keyword}</span>
          </div>
        )
      }
      {
        categoryList.length > 0 && (
          <div>
            <span className="font-semibold text-xl">Categories:</span>
            {
              categoryList.map((element, index) => (
                <div key={index} className="inline ml-2 text-xl">
                  {categories[parseInt(element)]}
                  {index < categoryList.length - 1 && ','}
                </div>
              ))
            }
          </div>
        )
      }
      {
        tagList.length > 0 && (
          <div>
            <span className="font-semibold text-xl">Tags:</span>
            {
              tagList.map((element, index) => (
                <div key={index} className="inline ml-2 text-xl">
                  {tags[parseInt(element)]}
                  {index < tagList.length - 1 && ','}
                </div>
              ))
            }
          </div>
        )
      }
    </>
  )
}
