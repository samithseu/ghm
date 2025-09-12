import type { ResolvableValue } from "@unhead/vue";

export const defaultSeo = {
  desc: "Welcome to GHM, a place where you can get your GitHub-based email address by username.",
  title: "GHM",
  site: "ghm.samith.info",
};

interface EZSEOProps {
  title: ResolvableValue<string | undefined>;
  description: ResolvableValue<string | undefined>;
  ogImageHeadline?: string;
  ogImageComponent?: string;
}

export const useGHMSEO = ({
  title,
  description,
  ogImageHeadline = "GHM - GitHub Mail",
  ogImageComponent = "EachPage",
}: EZSEOProps) => {
  useSeoMeta({
    title: title,
    description,
    ogSiteName: defaultSeo.site,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterSite: defaultSeo.site,
    twitterDescription: description,
  });

  // Render the Open Graph image component:
  defineOgImageComponent(ogImageComponent, {
    headline: ogImageHeadline,
    title: title,
    desc: description,
  });
};
