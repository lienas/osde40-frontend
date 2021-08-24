// import { GetServerSideProps } from "next";
// import React from "react";
// // import PageBase from '../../components/PageBase';
import { fetchContent, Content } from "../../shared/data";
import Head from "next/head";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const secret = context.req.headers.secret as string;
//   const pathSegments = context?.params?.draftRouter;

//   // if (secret !== process.env.SERVICE_SECRET) {
//   //     return {
//   //         notFound: true,
//   //     };
//   // }

//   return await fetchPageProps(pathSegments, true);
// };

// const fetchPageProps = async (
//   routerQuery: string | string[],
//   isDraft = false
// ): Promise<StaticProps> => {
//   const xpPath = routerQueryToXpPathOrId(routerQuery || "");
//   const content = await fetchPage(xpPath, isDraft, secret);

//   // Media content should redirect to the mediaUrl generated by XP
//   if (isMediaContent(content)) {
//     return redirectProps(getMediaUrl(content.mediaUrl, isDraft));
//   }

//   if (isNotFound(content)) {
//     const sanitizedPath = sanitizeLegacyUrl(xpPath);

//     if (sanitizedPath !== xpPath) {
//       return redirectProps(stripXpPathPrefix(sanitizedPath));
//     }

//     return {
//       props: {},
//       notFound: true,
//     };
//   }

//   if (content.__typename === ContentType.Error) {
//     return errorHandler(content);
//   }

//   /*
//     const redirectTarget = getTargetIfRedirect(content);
//     if (redirectTarget) {
//         return redirectProps(
//             getRelativePathIfInternal(redirectTarget, isDraft)
//         );
//     }
//      */

//   return {
//     props: { content },
//   };
// };

type Props = {
  content: Content;
};

const Element: React.FC<Props> = ({ content }) => {
  // NOTE: This is a hack to make Next display content when being used as a
  // router in dev mode.
  //
  // Some relevant discussions on this can be found in these two GitHub
  // discussions/issues:
  //
  // - https://github.com/vercel/next.js/discussions/16104
  // - https://github.com/vercel/next.js/issues/13058
  //
  // In short: Next adds a style tag to the HTML <head> tag when running in dev mode
  // that sets the body's `display` to `none`. This is to avoid FOUC (flash of
  // unstyled content) issues. According to the discussions above, it should not
  // come up in production.
  //
  // This workaround is probably not the ideal way to fix it, and I would
  // request that someone else (who has more time) looks into a cleaner
  // way of doing it. However, it _does_ work and gets me past this hurdle for
  // now.
  const Style = () => (
    <Head>
      <style
        dangerouslySetInnerHTML={{
          __html: `body { display: block !important; }`,
        }}
      />
    </Head>
  );

  return (
    <>
      <Style />
      <div>
        <h1>{content.displayName}</h1>
        <p>
          This is a page containing data about {content.displayName}. It was
          generated by Next.js.
        </p>
      </div>
    </>
  );
};

// this type is purposefully naive. Please make sure to update this with a more
// accurate model before using it.
type Context = {
  params: { draftrouter: string[] };
};

// this function also needs some serious refactoring, but for a quick and dirty
// proof of concept it does the job.
export const getServerSideProps = async ({ params }: Context) => {
  const path = "/" + params.draftrouter.join("/");

  const fallback = { displayName: "N/A", _path: "None" };
  const content = path
    ? await fetchContent(path).catch((err) => {
        console.error(err);
        return fallback;
      })
    : fallback;

  return {
    props: {
      content,
    },
  };
};

export default Element;