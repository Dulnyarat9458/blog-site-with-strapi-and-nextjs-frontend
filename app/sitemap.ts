const generateSitemapObjects = async (target: string) => {
	const options = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
		},
	};
	const url = `${process.env.NEXT_PUBLIC_API_URL}/api/${target}?&sort[0]=createdAt:desc`;
	const res = await fetch(url, options)
	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}
	const contents = await res.json();
	return contents.data.map((content: any) => ({
		slug: content.id,
		updatedAt: content.attributes.updatedAt,
	}));
};

export default async function sitemap() {
	return [
		{
			url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
			priority: 1,
		},
		{
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/contents`,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		...(await generateSitemapObjects("contents")).map((content: { slug: number, updatedAt: Date }) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/contents/${content.slug}`,
			changeFrequency: "weekly",
			lastModified: new Date(content.updatedAt),
			priority: 0.6,
		})),
		{
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/categories`,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		...(await generateSitemapObjects("categories")).map((category: { slug: number, updatedAt: Date }) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/categories/${category.slug}`,
			changeFrequency: "weekly",
			lastModified: category.updatedAt,
			priority: 0.6,
		})),
		{
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/tags`,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		...(await generateSitemapObjects("tags")).map((tag: { slug: number, updatedAt: Date }) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/tags/${tag.slug}`,
			changeFrequency: "weekly",
			lastModified: tag.updatedAt,
			priority: 0.6,
		})),
	];
}