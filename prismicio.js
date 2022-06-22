import * as prismic from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import sm from "./sm.json";

export const endpoint = sm.apiEndpoint;
export const repositoryName = prismic.getRepositoryName(endpoint);

// Update the Link Resolver to match your project's route structure
export function linkResolver(doc) {
  switch (doc.type) {
    case "homepage":
      return "/";
    case "page":
      return `/${doc.uid}`;
    case "players":
      return `/${doc.uid}`;
    case "news":
      return `/${doc.uid}`;
    case "watch":
      return `/${doc.uid}`;
    case "tickets":
      return `/${doc.uid}`;
    case "apply":
      return `/${doc.uid}`;
    case "location":
      return `/tournament/${doc.uid}`;
    default:
      return null;
  }
}

// This factory function allows smooth preview setup
export function createClient(config = {}) {
  const client = prismic.createClient(endpoint, {
    ...config
  });

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req
  });

  return client;
}
