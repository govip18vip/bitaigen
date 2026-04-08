import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
    customData: `<language>zh-CN</language><atom:link href="${SITE.website}rss.xml" rel="self" type="application/rss+xml" />`,
    items: sortedPosts.map(({ data, id, filePath }) => ({
      link: getPath(id, filePath),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
      categories: data.tags,
      author: data.author ?? SITE.author,
    })),
  });
}
