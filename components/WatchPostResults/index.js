import { useEffect, useState } from "react";
import { createClient } from "@root/prismicio";
import { usePrismicDocumentsByType } from "@prismicio/react";
import NewsPostPreview from "@components/NewsPostPreview";
const client = createClient();
const postsPerPage = 6;

export default function WatchPostResults({ filterBy, resultsPage, updatePostPages }) {
  const [postResults, setPostResults] = useState([]);
  // fetchQuery: only pass document.tags to query if filterBy value exists
  const fetchQuery = {
    type: `[at(document.type, "watch-post")]`,
    // not: `[not(document.id,"${pinnedPostUID}")]`,
    ...(filterBy !== "view all" && filterBy && { filterBy: `[at(document.tags,["${filterBy}"])]` })
  };

  const [documents, { state, error }] = usePrismicDocumentsByType("watch-post", {
    client: client,
    orderings: {
      field: "my.watch-post.postDate",
      direction: "desc"
    },
    q: `[${Object.values(fetchQuery).join("")}]`,
    pageSize: postsPerPage,
    page: resultsPage
  });

  useEffect(() => {
    function getUniqueListBy(arr, key) {
      return [...new Map(arr.map((item) => [item[key], item])).values()];
    }
    if (documents?.results && state === "loaded") {
      if (documents.results.length > 0) {
        updatePostPages(Math.ceil(documents?.total_results_size / postsPerPage));
      } else {
        updatePostPages(-1);
      }

      setPostResults((currentPostResults) =>
        getUniqueListBy([...currentPostResults, ...documents.results], "id")
      );
    }
  }, [documents, state]);

  return (
    <>
      {postResults.length > 0 &&
        postResults.map((post) => <NewsPostPreview {...post} slug={post.uid} key={post.id} />)}
    </>
  );
}
