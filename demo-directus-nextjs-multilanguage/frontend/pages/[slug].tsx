import { FC, PropsWithChildren } from "react";
import styles from "../styles/BlogPost.module.css";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { useRouter } from "next/router";
import { Blog } from "../lib/types";
import directus from "../lib/directus";
type Props = PropsWithChildren<{
  post: Blog;
}>;

const BlogPage: FC<Props> = ({ post }) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <button
        onClick={() =>
          router.push(
            {
              pathname: router.pathname,
              query: router.query,
            },
            undefined,
            { locale: "en" }
          )
        }
      >
        Chang to en
      </button>
      <button
        onClick={() =>
          router.push(
            {
              pathname: router.pathname,
              query: router.query,
            },
            undefined,
            { locale: "vi" }
          )
        }
      >
        Chang to vi
      </button>

      <h1>{post?.translations[0]?.title}</h1>
      {/* <p>{post?.translations[0]?.detail}</p> */}
      <MDXRemote {...post?.detail} />
    </div>
  );
};

export const getStaticProps = async ({
  params,
  locale,
}: {
  params: {
    slug: string;
  };
  locale: string;
}) => {
  const res = await directus.items("blog").readByQuery({
    filter: { slug: params.slug },
    fields: ["title", "slug", "id", "image_cover.id", "translations.*"],
    deep: {
      translations: {
        _filter: {
          languages_id: {
            _eq: `${locale === "en" ? "en-US" : "vi-VN"}`,
          },
        },
      },
    },
  });

  return {
    props: {
      post: {
        ...(res.data[0] as Blog),
        detail: await serialize(res.data[0]?.translations[0]?.detail),
      },
    },
  };
};

export const getStaticPaths = async ({
  locales,
}: {
  locales: string[];
  locale: string;
}) => {
  // get current luanguage
  // const { locale } = useRouter();
  console.log("locale", locales);
  const res = await directus.items("blog").readByQuery({
    limit: -1,
    fields: ["slug"],
  });
  //   console.log(
  //
  //   );
  return {
    paths: locales
      .map((l) =>
        res.data.map((post: { slug: any }) => ({
          params: {
            slug: post.slug,
          },
          locale: l,
        }))
      )
      .flat(),
    fallback: false,
  };
};

export default BlogPage;
