import React, { useEffect, useState } from "react";
import Head from "next/head";
import { getAllArticles } from "../utils/mdx";
import { ArticleLink, BlogCard, Heading, Tag } from "../components";
import { TBlogCard } from "../types";
import { useRouter } from "next/router";

type BlogProps = {
  posts: TBlogCard[];
};
const Blog = ({ posts }: BlogProps) => {
  const router = useRouter();
  const [allPosts, setAllPosts] = useState<TBlogCard[]>([]);
  useEffect(() => {
    setAllPosts([...new Set(posts)]);
  }, [posts]);
  const tags = [...new Set(posts.map((post) => post.tags.split(",")))].flat(2);
  const filterPostsByTag = (tag: string) => {
    const filteredPosts = posts.filter((post) =>
      post.tags.toLowerCase().includes(tag.toLowerCase())
    );
    if (filteredPosts.length) {
      setAllPosts(filteredPosts);
    }
  };
  const tagPost = (tag: string) => {
    const baseURL = document.URL.split("?")[0];
    const url = new URL(`${baseURL}?filterby=${tag}`);
    router.push(`/?filterby=${tag}`);
  };
  useEffect(() => {
    const filter = router.query["filterby"];
    if (filter) {
      filterPostsByTag(String(filter));
    }
  }, [router.query]);
  return (
    <>
      <Head>
        <title>Francis Amidu{`'`}s blog</title>
      </Head>
      <main className="bg-white md:px-0 px-5 max-w-screen-lg mx-auto">
        <div className="border-b border-b-gray-100">
          <div className="py-10 w-full">
            <h1 className="font-bold text-4xl text-new-100 text-center md:text-left">
              Welcome to my blog
            </h1>
            <p className="text-new-200 text-2xl font-light my-4 text-center md:text-left">
              Here i detail my journey as a software engineer. I write about the
              projects i{`'`}ve worked on, the bugs i have encountered and
              solved and everything i learned.
            </p>
          </div>
        </div>
        <div className="py-5 main-content sm:text-inherit">
          <div className="col-start-1 col-end-2">
            <Heading heading="Recently Published" />
            {allPosts.map((frontmatter) => (
              <BlogCard key={frontmatter.slug} data={frontmatter} />
            ))}
          </div>
          <div className="md:col-start-2 md:col-end-3 sm:col-start-1 sm:col-end-2">
            <div>
              <Heading heading="Top Categories" />
              <div className="flex flex-row items-center justify-start flex-wrap">
                {tags.map((tag, index) => (
                  <Tag key={index} tag={tag} onClick={() => tagPost(tag)} />
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
    return new Date(a.publishedAt).getTime() < new Date(b.publishedAt).getTime()
      ? 1
      : -1;
  });

  return {
    props: {
      posts: sortedArticles,
    },
  };
};

export default Blog;
