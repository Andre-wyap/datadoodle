import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

// Proof captures. Cropped from the originals in /Portfolio to the four things
// that make a capture evidence — the query, the platform, the named business
// and the citation — with browser chrome, side panels and dead space removed.
import sfgShot from "../assets/proof/sfg-perplexity.png";
import angBrothersShot from "../assets/proof/ang-brothers-google-aio.png";
import nookShot from "../assets/proof/nook-nook-perplexity.png";
import advancedShot from "../assets/proof/advanced-consultancy-perplexity.png";
import koreanShot from "../assets/proof/korean-explorer-perplexity.png";
import fourSolutionsShot from "../assets/proof/four-solutions-google-aio.png";

export interface CaseStudy {
  company: string;
  industry: string;
  platform: string;
  query: string;
  result: string;
  resultType: string;
  named: string;
  verified: string;
  caveat: string | null;
  shot: { src: string; width: number; height: number };
}

// One WebP per capture, feeding both the inline exhibit (~600px) and the
// lightbox (up to 1000px). 1300px covers the lightbox on a 4G phone without
// shipping the full crop; narrower crops are never upscaled.
const shot = async (image: ImageMetadata) => {
  const width = Math.min(1300, image.width);
  const height = Math.round((width * image.height) / image.width);
  const optimised = await getImage({ src: image, format: "webp", quality: 74, width });
  return { src: optimised.src, width, height };
};

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return [
    {
      company: "Singapore Funeral Group",
      industry: "Funeral services — Singapore",
      platform: "Perplexity",
      query: "affordable funeral package singapore",
      result:
        "Named and cited with their own pricing, direct cremation from S$1,588, carried into the answer. Also named on ChatGPT, Gemini and Google's AI Overview.",
      resultType: "Named and cited",
      named: "Singapore Funeral Group, cited as funeralgroup",
      verified: "30 July 2026",
      caveat: null,
      shot: await shot(sfgShot),
    },
    {
      company: "Ang Brothers Funeral Services",
      industry: "Funeral services — Singapore",
      platform: "Google AI Overview",
      query: "my parents just passed who to contact for buddhist funeral",
      result:
        "Named first among trusted options, with their real 24-hour hotline quoted back to the reader. Also ChatGPT's top Buddhist-funeral pick.",
      resultType: "First named result",
      named: "Ang Brothers Funeral Services, listed first",
      verified: "30 July 2026",
      caveat: null,
      shot: await shot(angBrothersShot),
    },
    {
      company: "Four Solutions",
      industry: "Mould and pest control — Singapore",
      platform: "Google AI Overview",
      query: "best mould removal in singapore",
      result: "Named #1 for mould removal in Singapore, cited as foursolutions.sg.",
      resultType: "First named result",
      named: "Four Solutions, cited as foursolutions.sg",
      verified: "30 July 2026",
      caveat: "AI Overview varies run to run. Other runs name different providers.",
      shot: await shot(fourSolutionsShot),
    },
    {
      company: "Nook Nook",
      industry: "Event space rental — Singapore",
      platform: "Perplexity",
      query: "modular event space singapore",
      result: "Listed first for modular event space in Singapore, cited as nooknook.",
      resultType: "First named result",
      named: "Nook Nook, cited as nooknook",
      verified: "30 July 2026",
      caveat: null,
      shot: await shot(nookShot),
    },
    {
      company: "Advanced Consultancy",
      industry: "Business consultancy — Singapore",
      platform: "Perplexity",
      query: "best business management consultancy for SMEs in singapore",
      result: "Named first on a shortlist of SME consultancies, cited as advancedconsultancy.com.",
      resultType: "First named result",
      named: "Advanced Consultancy, cited as advancedconsultancy.com",
      verified: "30 July 2026",
      caveat: null,
      shot: await shot(advancedShot),
    },
    {
      company: "Korean Explorer",
      industry: "Language school — Singapore",
      platform: "Perplexity",
      query: "where to learn korean language in singapore",
      result: "Appears in the recommended shortlist of Korean language schools in Singapore.",
      resultType: "Shortlist appearance",
      named: "Korean Explorer, in the recommended shortlist",
      verified: "30 July 2026",
      caveat: "Named inconsistently between runs: a shortlist appearance, not a fixed position.",
      shot: await shot(koreanShot),
    },
  ];
}
