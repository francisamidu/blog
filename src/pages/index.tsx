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
      <main className="bg-white max-w-screen-lg md:mx-auto">
        <div className="border-b border-b-gray-100">
          <div className="p-10 w-full">
            <h1 className="font-bold text-4xl text-new-100">
              Welcome to my blog
            </h1>
            <p className="text-new-200 text-2xl font-light my-4">
              Here i detail my journey as a software engineer. I write about the
              projects i{`'`}ve worked on, the bugs i have encountered and
              solved and everything i learned.
            </p>
          </div>
        </div>
        <div className="p-2">
          <h2 className="uppercase text-xs font-bold text-new-300">
            Recently published
          </h2>
          {posts.map((frontmatter) => (
            <BlogCard key={frontmatter.slug} data={frontmatter} />
          ))}
        </div>
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
