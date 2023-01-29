import dayjs from "dayjs";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import rehypeSlug from "rehype-slug";
import { MDXRemote } from "next-mdx-remote";
import { Pluggable, Settings, Plugin } from "../../node_modules/unified";
import rehypeHighlight from "rehype-highlight";
import rehypeCodeTitles from "rehype-code-titles";
import { serialize } from "next-mdx-remote/serialize";
import { getSlug, getArticleFromSlug } from "../utils/mdx";
import "highlight.js/styles/atom-one-dark-reasonable.css";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { TBlogCard } from "../types";

type BlogPostProps = {
  post: {
    frontmatter: TBlogCard;
    source: {
      compiledSource: string;
      scope: {};
    };
  };
};
const ImageElement: any = Image;
const BlogPost = ({ post: { frontmatter, source } }: BlogPostProps) => {
  const { excerpt, publishedAt, title } = frontmatter;
  return (
    <>
      <Head>
        <title>{frontmatter.title} | My blog</title>
      </Head>
      <main className="">
        <div className="min-h-screen flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl text-center">{title}</h1>
          <span className="text-new-200">
            {dayjs(publishedAt).format("DD MMMM YYYY")}
          </span>
        </div>
        <div className="content">
          <MDXRemote {...source} components={{ ImageElement }} />
        </div>
      </main>
    </>
  );
};

export default BlogPost;

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const { content, frontmatter } = await getArticleFromSlug(slug);

  const source = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug as Pluggable<[Settings?], Settings>,
        [
          rehypeAutolinkHeadings as Plugin<[Settings?], Settings>,
          {
            properties: { className: ["anchor"] },
          },
        ],
        rehypeHighlight as Pluggable<[Settings?], Settings>,
        rehypeCodeTitles,
      ],
    },
  });

  return {
    props: {
      post: {
        source,
        frontmatter,
      },
    },
  };
};

// dynamically generate the slugs for each article(s)
export async function getStaticPaths() {
  // getting all paths of each article as an array of
  // objects with their unique slugs
  const paths = (await getSlug()).map((slug) => ({ params: { slug } }));
  return {
    paths,
    // in situations where you try to access a path
    // that does not exist. it'll return a 404 page
    fallback: false,
  };
}
