import { useEffect } from "react";
import thoughtsData from "../data/thoughts.json";
import { JournalEntry } from "../types";

const SITE_URL = "https://vipingcode.github.io";
const SITE_NAME = "Vipin Gupta - Group Finance Manager & FinOps Strategist";
const DEFAULT_TITLE = `Cloud Finance & FinOps Strategy | ${SITE_NAME}`;
const DEFAULT_DESCRIPTION =
	"Vipin Gupta is a Singapore-based Group Finance Manager and FinOps Strategist specializing in AI, cloud strategy, APIs, data, fintech, and cost optimization.";
const DEFAULT_IMAGE = `${SITE_URL}/preview.png`;
const PUBLISHED_ARTICLES = (thoughtsData as JournalEntry[]).filter((entry) => entry.externalUrl);

const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
	let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
	if (!element) {
		element = document.createElement("meta");
		element.setAttribute(attribute, key);
		document.head.appendChild(element);
	}
	element.content = content;
};

const upsertLink = (rel: string, href: string) => {
	let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
	if (!element) {
		element = document.createElement("link");
		element.rel = rel;
		document.head.appendChild(element);
	}
	element.href = href;
};

const upsertJsonLd = (id: string, data: Record<string, unknown>) => {
	let element = document.head.querySelector<HTMLScriptElement>(`script[data-seo-schema="${id}"]`);
	if (!element) {
		element = document.createElement("script");
		element.type = "application/ld+json";
		element.dataset.seoSchema = id;
		document.head.appendChild(element);
	}
	element.textContent = JSON.stringify(data);
};

const getArticleDate = (date: string) => {
	const parsedDate = new Date(date.replace("·", ""));
	return Number.isNaN(parsedDate.valueOf()) ? "2024-01-01" : parsedDate.toISOString().slice(0, 10);
};

const buildStructuredData = () => ({
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Person",
			"@id": `${SITE_URL}/#vipin-gupta`,
			name: "Vipin Gupta",
			url: SITE_URL,
			jobTitle: "Group Finance Manager & FinOps Strategist",
			description: DEFAULT_DESCRIPTION,
			address: { "@type": "PostalAddress", addressLocality: "Singapore", addressCountry: "SG" },
			knowsAbout: ["Artificial Intelligence", "FinOps", "Cloud Strategy", "APIs", "Data", "Fintech"],
			sameAs: ["https://github.com/vipingCode", "https://www.linkedin.com/in/vipin1gupta/"],
		},
		{
			"@type": "WebSite",
			"@id": `${SITE_URL}/#website`,
			url: SITE_URL,
			name: SITE_NAME,
			publisher: { "@id": `${SITE_URL}/#vipin-gupta` },
			inLanguage: "en-SG",
		},
		{
			"@type": "BreadcrumbList",
			itemListElement: [
				{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
				{ "@type": "ListItem", position: 2, name: "Cloud Finance & FinOps Strategy", item: `${SITE_URL}/#hero` },
			],
		},
		...PUBLISHED_ARTICLES.map((article) => ({
			"@type": "BlogPosting",
			"@id": `${SITE_URL}/#${article.id}`,
			headline: article.title,
			description: article.summary,
			datePublished: getArticleDate(article.date),
			image: `${SITE_URL}${article.imageUrl}`,
			keywords: article.tags.join(", "),
			mainEntityOfPage: article.externalUrl,
			author: { "@id": `${SITE_URL}/#vipin-gupta` },
			publisher: { "@id": `${SITE_URL}/#vipin-gupta` },
		})),
	],
});

export const SeoHead = () => {
	useEffect(() => {
		document.documentElement.lang = "en";
		document.title = DEFAULT_TITLE;

		upsertMeta("name", "description", DEFAULT_DESCRIPTION);
		upsertMeta(
			"name",
			"keywords",
			"Vipin Gupta, Group Finance Manager, FinOps Strategist, cloud finance, cloud strategy, AI, APIs, data, fintech, Singapore",
		);
		upsertMeta("name", "author", "Vipin Gupta");
		upsertMeta("name", "language", "en-SG");
		upsertMeta("name", "geo.region", "SG");
		upsertMeta("name", "geo.placename", "Singapore");
		upsertMeta("name", "twitter:card", "summary_large_image");
		upsertMeta("name", "twitter:title", DEFAULT_TITLE);
		upsertMeta("name", "twitter:description", DEFAULT_DESCRIPTION);
		upsertMeta("name", "twitter:image", DEFAULT_IMAGE);
		upsertMeta("property", "og:title", DEFAULT_TITLE);
		upsertMeta("property", "og:description", DEFAULT_DESCRIPTION);
		upsertMeta("property", "og:type", "website");
		upsertMeta("property", "og:image", DEFAULT_IMAGE);
		upsertMeta("property", "og:url", SITE_URL);
		upsertMeta("property", "og:site_name", SITE_NAME);
		upsertMeta("property", "og:locale", "en_SG");
		upsertLink("canonical", `${SITE_URL}/`);
		upsertJsonLd("portfolio", buildStructuredData());
	}, []);

	return null;
};
