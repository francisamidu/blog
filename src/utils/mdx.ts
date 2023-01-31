import path from "path";
import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";
import { glob, sync } from "glob";
import { TBlogCard } from "../types";

const articlesPath = path.join(process.cwd(), "src/articles");

// get unique article, when it is clicked on, by the user
// on the blog page
// function getSlug(slugPath: string) {
//   const [slug] = /.+(?=.mdx)/i.exec(path.basename(slugPath)) as string[];
//   return slug;
// }
// export function findAllPostSlugs() {
//   const results = glob(path.join(articlesPath, '*.mdx'),() => {})
//   results.minimatch.match()
//   return .then((paths) =>
//       paths.map(getSlug)
//   );
// }
export async function getSlug() {
  const articles = fs.readdirSync(articlesPath);

  return articles.map((path) => {
    // holds the paths to the directory of the article
    const parts = path.split("/");
    const fileName = parts[parts.length - 1]; // gets the last part of path with /name.mdx
    const [slug, _extension] = fileName.split(".");

    return slug;
  });
}

export async function getArticleFromSlug(slug) {
  const articleDir = path.join(articlesPath, `${slug}.mdx`);
  const source = fs.readFileSync(articleDir);
  const { content, data } = matter(source);

  return {
    content,
    frontmatter: {
      slug,
      excerpt: data.excerpt,
      title: data.title,
      publishedAt: data.publishedAt,
      readingTime: readingTime(String(source)).text,
      ...data,
    },
  };
}

// get the path that stores all the articles or blog post
export async function getAllArticles() {
  const articles = fs.readdirSync(articlesPath);

  return articles
    .map((article) => {
      const source = fs.readFileSync(path.join(articlesPath, article));
      const data = matter(source).data as TBlogCard;
      return [
        {
          ...data,
          slug: article.replace(".mdx", ""),
          readingTime: readingTime(String(source)).text,
        },
      ];
    })
    .flat(1);
}
