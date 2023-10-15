import WithTableOfContents from "@/components/layouts/WithTableOfContents";
import Head from "@/components/meta/Head";
import SkipNavigation from "@/components/navigations/SkipNavigation";
import PageHeader from "@/components/PageHeader";

import { getPageOgImageUrl } from "@/helpers/page";

import type { TPageFrontMatter, TTableOfContents } from "@/types";
import type { PropsWithChildren } from "react";

interface PageWithMDXProps {
  frontMatter: TPageFrontMatter;
  tableOfContents: TTableOfContents;
  headerImage: string | null;
}

function PageWithMDX({
  frontMatter: { title, description, caption },
  tableOfContents,
  headerImage,
  children = null,
}: PropsWithChildren<PageWithMDXProps>) {
  const image = getPageOgImageUrl({
    caption,
    title,
    description,
  });

  return (
    <>
      <SkipNavigation />
      <Head title={title} description={description} ogImage={image.default} />
      <PageHeader
        title={title}
        description={description}
        caption={caption}
        headerImage={headerImage}
      />
      <WithTableOfContents tableOfContents={tableOfContents}>
        {children}
      </WithTableOfContents>
    </>
  );
}

export default PageWithMDX;
