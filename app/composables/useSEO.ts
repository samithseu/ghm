import type { ResolvableValue } from "@unhead/vue";

export const defaultSeo = {
  desc: "GHM or GitHub-Mail, a place where you can get your GitHub-based email by username.",
  title: "GHM",
  site: "ghm.samith.dev",
};

interface EZSEOProps {
  title: ResolvableValue<string>;
  description?: ResolvableValue<string>;
  email?: ResolvableValue<string>;
  username?: ResolvableValue<string>;
  ogImageHeadline?: string;
}

export const useGHMSEO = ({
  title,
  description,
  email,
  username,
  ogImageHeadline = "GHM - GitHub Mail",
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
        url: "samith.dev",
        name: "Samith Seu",
      },
      author: {
        "@id": "samith.dev",
        "@type": "Person",
        name: "Samith Seu",
        sameAs: [
          "https://samith.dev",
          "https://github.com/samithseu",
          "https://linkedin.com/in/samith-seu/",
          "https://x.com/seumith",
          "https://t.me/samithseu",
        ],
        url: "samith.dev",
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
    title: title?.toString(),
    description,
    ogSiteName: defaultSeo.site,
    ogTitle: title?.toString(),
    ogDescription: description,
    twitterTitle: title?.toString(),
    twitterSite: defaultSeo.site,
    twitterDescription: description,
  });

  // Render the Open Graph image component:
  defineOgImage("EachPage.takumi", {
    headline: ogImageHeadline,
    title: title?.toString(),
    desc: description,
    email: email,
    username: username,
  } as {
    headline: string;
    title: string;
    email?: string;
    desc?: string;
    username?: string;
  });
};
