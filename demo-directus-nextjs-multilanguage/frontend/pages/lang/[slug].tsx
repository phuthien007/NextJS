// import { FC, PropsWithChildren } from "react";
// import styles from "../../styles/BlogPost.module.css";
// import { serialize } from "next-mdx-remote/serialize";
// import { MDXRemote } from "next-mdx-remote";
// import { useRouter } from "next/router";
// import { Blog } from "../../lib/types";
// import directus from "../../lib/directus";
// type Props = PropsWithChildren<{
//   post: Blog;
// }>;

// const BlogPage: FC<Props> = ({ post }) => {
//   return (
//     <div className={styles.container}>
//       <h1>{post?.translations[0]?.title}</h1>
//       {/* <p>{post?.translations[0]?.detail}</p> */}
//       <MDXRemote {...post?.detail} />
//     </div>
//   );
// };

// // export const getStaticProps = async ({
// //   params,
// // }: {
// //   params: {
// //     slug: string;
// //   };
// // }) => {
// //   console.log(params);
// //   const res = await directus.items("blog").readByQuery({
// //     filter: { slug: params.slug[0] },
// //     fields: ["title", "slug", "id", "image_cover.id", "translations.*"],
// //     deep: {
// //       translations: {
// //         _filter: {
// //           languages_id: {
// //             _eq: `${params.slug[1] === "en" ? "en-US" : "vi-VN"}`,
// //           },
// //         },
// //       },
// //     },
// //   });

// //   return {
// //     props: {
// //       post: {
// //         ...(res.data[0] as Blog),
// //         detail: await serialize(res.data[0]?.translations[0]?.detail),
// //       },
// //     },
// //   };
// // };

// // export const getStaticPaths = async ({
// //   locales,
// //   defaultLocale,
// // }: {
// //   locales: string[];
// //   defaultLocale: string;
// // }) => {
// //   // get current luanguage
// //   // const { locale } = useRouter();
// //   console.log(locales);
// //   console.log(defaultLocale);
// //   const res = await directus.items("blog").readByQuery({
// //     limit: -1,
// //     fields: ["slug"],
// //   });

// //   return {
// //     paths: res.data.map((post: { slug: any }) => ({
// //       params: {
// //         slug: post.slug,
// //       },
// //     })),
// //     fallback: false,
// //   };
// // };

// export const getServerSideProps = async ({ params }) => {
//   console.log(params);
//   const res = await directus.items("blog").readByQuery({
//     filter: { slug: params.slug },
//     fields: ["title", "slug", "id", "image_cover.id", "translations.*"],
//     deep: {
//       translations: {
//         _filter: {
//           languages_id: {
//             _eq: params.lang === "en" ? "en-US" : "vi-VN",
//           },
//         },
//       },
//     },
//   });

//   return {
//     props: {
//       post: {
//         ...(res.data[0] as Blog),
//         detail: await serialize(res.data[0]?.translations[0]?.detail),
//       },
//     },
//   };
// };

// export default BlogPage;
