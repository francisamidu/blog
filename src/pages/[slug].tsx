import dayjs from "dayjs";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import rehypeSlug from "rehype-slug";
import { MDXRemote } from "next-mdx-remote";
import { Pluggable, Settings, Plugin } from "../../node_modules/unified";
import rehypeHighlight from "rehype-highlight";
import rehypeCodeTitles from "rehype-code-titles";
import sr from "next-mdx-remote/serialize";
import { getSlug, getArticleFromSlug } from "../utils/mdx";
import "highlight.js/styles/atom-one-dark-reasonable.css";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
export default function BlogPost({ post: { source, frontmatter } }) {
  return (
    <>
      <Head>
        <title>{frontmatter.title} | My blog</title>
      </Head>
      <div className="article-container">
        <h1 className="article-title">{frontmatter.title}</h1>
        <p className="publish-date">
          {dayjs(frontmatter.publishedAt).format("MMMM D, YYYY")} &mdash;{" "}
          {frontmatter.readingTime}
        </p>
        <div className="content">
          <MDXRemote {...source} components={{ Image }} />
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const { content, frontmatter } = await getArticleFromSlug(slug);

  const mdxSource = await sr.serialize(content, {
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
        source: mdxSource,
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
