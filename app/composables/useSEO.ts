import type { ResolvableValue } from "@unhead/vue";

export const defaultSeo = {
  desc: "GHM or GitHub-Mail, a place where you can get your GitHub-based email by username.",
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
  // schema.org structured data
  useSchemaOrg([
    defineWebSite({
      name: ogImageHeadline,
      description: defaultSeo.desc,
      url: defaultSeo.site,
    }),
    defineWebPage({
      "@id": defaultSeo.site,
      "@type": "SearchResultsPage",
      url: useRoute().fullPath ?? defaultSeo.site,
      name: title,
      description,
      isPartOf: {
        url: "samith.info",
        name: "Samith Seu",
      },
      author: {
        "@id": "samith.info",
        "@type": "Person",
        name: "Samith Seu",
        sameAs: [
          "https://samith.info",
          "https://github.com/samithseu",
          "https://linkedin.com/in/samith-seu/",
          "https://x.com/seumith",
          "https://t.me/samithseu",
        ],
        url: "samith.info",
      },
      inLanguage: "en-US",
      keywords: [
        "GHM",
        "GitHub Mail",
        "GitHub Email",
        "GitHub Profile",
        "GitHub Username",
      ],
      potentialAction: [
        defineSearchAction({
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `https://${defaultSeo.site}/{search_term_string}`,
          },
          "query-input": {
            "@type": "PropertyValueSpecification",
            valueRequired: true,
            valueName: "search_term_string",
          },
        }),
        defineReadAction({
          "@type": "ReadAction",
          target: [useRoute().fullPath ?? defaultSeo.site],
        }),
      ],
    }),
  ]);

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
