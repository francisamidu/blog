import React from "react";
import Head from "next/head";
import { getAllArticles } from "../utils/mdx";
import { BlogCard } from "../components";
import { TBlogCard } from "../types";

type BlogProps = {
  posts: TBlogCard[];
};
export default function Blog({ posts }: BlogProps) {
  return (
    <>
      <Head>
        <title>Francis Amidu{`'`}s blog</title>
      </Head>
      <main>
        <div className="p-4 w-full min-h-[500px]">
          <h1 className="font-bold text-2xl text-new-100">
            Welcome to my blog
          </h1>
          <p className="text-new-200 my-4">
            Here i detail my juorney as a software engineer. I write about the
            projects i{`'`}ve worked on, the bugs i have encountered and solved
            and everything i learned.
          </p>
        </div>
        {posts.map((frontmatter) => (
          <BlogCard key={frontmatter.slug} data={frontmatter} />
        ))}
      </main>
    </>
  );
}

export async function getStaticProps() {
  let articles = await getAllArticles();

  const sortedArticles = articles.map((article) => article);

  sortedArticles.sort((a, b) => {
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });

  return {
    props: {
      posts: sortedArticles,
    },
  };
}
