import React, { useEffect, useState } from "react";
import Head from "next/head";
import { getAllArticles } from "../utils/mdx";
import { ArticleLink, BlogCard, Heading, Tag } from "../components";
import { TBlogCard } from "../types";

type BlogProps = {
  posts: TBlogCard[];
};
const Blog = ({ posts }: BlogProps) => {
  const [allPosts, setAllPosts] = useState<TBlogCard[]>([]);
  useEffect(() => {
    setAllPosts([...new Set(posts)]);
  }, [posts]);
  const tags = [...new Set(posts.map((post) => post.tags.split(",")))].flat(2);
  const filterPostsByTag = (tag: string) => {
    const filteredPosts = posts.filter((post) =>
      post.tags.toLowerCase().includes(tag.toLowerCase())
    );
    setAllPosts(filteredPosts);
  };
  return (
    <>
      <Head>
        <title>Francis Amidu{`'`}s blog</title>
      </Head>
      <main className="bg-white max-w-screen-lg md:mx-auto">
        <div className="border-b border-b-gray-100">
          <div className="py-10 w-full">
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
        <div className="py-5 main-content">
          <div className="col-start-1 col-end-2">
            <Heading heading="Recently Published" />
            {allPosts.map((frontmatter) => (
              <BlogCard key={frontmatter.slug} data={frontmatter} />
            ))}
          </div>
          <div className="col-start-2 col-end-3">
            <div>
              <Heading heading="Top Categories" />
              <div className="flex flex-row items-center justify-start flex-wrap">
                {tags.map((tag, index) => (
                  <Tag key={index} tag={tag} />
                ))}
              </div>
            </div>
            <div className="mt-6">
              <Heading heading="Popular Reads" />
              <div className="flex flex-col">
                {allPosts.map((post) => (
                  <ArticleLink
                    key={post.slug}
                    path={post.slug}
                    title={post.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const getStaticProps = async () => {
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
};

export default Blog;
