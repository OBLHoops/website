import { useEffect, useState, useRef } from "react";
import { createClient } from "@root/prismicio";
import { usePrismicDocumentsByType } from "@prismicio/react";
import NewsPostPreview from "@components/NewsPostPreview";
const client = createClient();
const newsPostPerPage = 1;

export default function NewsPostResults({ filterBy, resultsPage, updatePostPages }) {
  console.log(filterBy);
  const [postResults, setPostResults] = useState([]);
  // fetchQuery: only pass document.tags to query if filterBy value exists
  const fetchQuery = {
    type: `[at(document.type, "news-post")]`,
    // not: `[not(document.id,"${pinnedPostUID}")]`,
    ...(filterBy !== "view all" && filterBy && { filterBy: `[at(document.tags,["${filterBy}"])]` })
  };

  const [documents, { state, error }] = usePrismicDocumentsByType("news-post", {
    client: client,
    orderings: {
      field: "my.news-post.postDate",
      direction: "desc"
    },
    q: `[${Object.values(fetchQuery).join("")}]`,
    pageSize: newsPostPerPage,
    page: resultsPage
  });

  useEffect(() => {
    function getUniqueListBy(arr, key) {
      return [...new Map(arr.map((item) => [item[key], item])).values()];
    }
    if (documents?.results && state === "loaded") {
      updatePostPages(documents?.total_results_size);
      setPostResults((currentPostResults) =>
        getUniqueListBy([...currentPostResults, ...documents.results], "id")
      );
    }
  }, [documents, state]);

  return (
    <>
      {postResults &&
        postResults.map((post) => <NewsPostPreview {...post} slug={post.uid} key={post.id} />)}
    </>
  );
}
