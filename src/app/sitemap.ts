import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = `${process.env.SITE_URL}`;
  return [
    {
      url: url,
    },
    {
      url: `${url}/salary1`,
    },
    {
      url: `${url}/salary2`,
    },
    {
      url: `${url}/salary2`,
    },
  ];
}
