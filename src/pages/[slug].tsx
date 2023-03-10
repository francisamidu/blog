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
import { Tag } from "../components";
import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/router";

type BlogPostProps = {
  post: {
    frontmatter: TBlogCard;
    source: any;
  };
};
const BlogPost = ({ post: { frontmatter, source } }: BlogPostProps) => {
  const { publishedAt, title, readingTime, tags: tag } = frontmatter;
  const tags = tag.split(",");
  const router = useRouter();
  const backToHome = () => {
    router.push("/");
  };
  return (
    <>
      <Head>
        <title>{frontmatter.title} | My blog</title>
      </Head>
      <main className="blog-item-content">
        <div className="min-h-[94vh] flex flex-col justify-center items-center relative">
          <ArrowLeftCircle
            size={25}
            className="text-new-100 absolute top-7 left-7 hover:cursor-pointer"
            onClick={backToHome}
          />
          <h1 className="font-bold text-5xl text-center w-2/3 mx-auto">
            {title}
          </h1>
          <span className="text-new-200 mt-4">
            {`Published ${dayjs(publishedAt).format(
              "DD MMMM YYYY"
            )} - ${readingTime}`}
          </span>
          <div className="flex flex-row items-center justify-center my-5">
            {tags.map((tag) => (
              <Tag tag={tag} key={tag} />
            ))}
          </div>
        </div>
        <div className="max-w-screen-md md:mx-auto mt-4 py-3">
          <MDXRemote {...source} components={{ Image }} />
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
export const getStaticPaths = async () => {
  // getting all paths of each article as an array of
  // objects with their unique slugs
  const paths = (await getSlug()).map((slug) => ({ params: { slug } }));
  return {
    paths,
    // in situations where you try to access a path
    // that does not exist. it'll return a 404 page
    fallback: false,
  };
};
