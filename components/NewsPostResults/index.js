import { useEffect } from "react";
import { createClient } from "@root/prismicio";
import { usePrismicDocumentsByType } from "@prismicio/react";
import { useSharedState } from "@lib/useSharedState";
import NewsPostPreview from "@components/NewsPostPreview";
const client = createClient();

export default function NewsPostResults() {
  const [postsData, setPostsData] = useSharedState("postsData", []);
  const [filterBy, setFilterBy] = useSharedState("filterBy");
  const [pagination, setPagination] = useSharedState("pagination", {
    current: 1,
    total: 1,
    active: false,
    available: true
  });
  const [firstRender, setFirstRender] = useSharedState("firstRender", true);

  // fetchQuery: only pass document.tags to query if filterBy value exists
  const fetchQuery = {
    type: `[at(document.type, "news-post")]`,
    // not: `[not(document.id,"${pinnedPostUID}")]`,
    ...(filterBy?.current !== "view all" &&
      filterBy?.current && { filterBy: `[at(document.tags,["${filterBy?.current}"])]` })
  };

  const [documents] = usePrismicDocumentsByType("news-post", {
    client: client,
    orderings: {
      field: "my.news-post.postDate",
      direction: "desc"
    },
    q: `[${Object.values(fetchQuery).join("")}]`,
    pageSize: 6,
    page: pagination.current
  });

  const getUniqueItemsBy = (arr, key) => [
    ...new Map(arr.map((item) => [item[key], item])).values()
  ];

  const handlePostsDataUpdate = (data, merge) => {
    if (merge) {
      setPostsData((current = []) => getUniqueItemsBy([...current, ...data], "id"));
    } else {
      setPostsData(getUniqueItemsBy([...data], "id"));
    }
  };

  const handlePagination = (data) => {
    if (data?.results.length > 0) {
      setPagination({ ...pagination, total: data?.total_results_size });
    } else {
      setPagination({ ...pagination, total: -1 });
    }
  };

  useEffect(() => {
    if (firstRender && documents?.results) {
      //-> On firstRender replace postData with fresh data

      // Update total pages
      handlePagination(documents);

      // Update posts data
      handlePostsDataUpdate(documents.results);

      // Updated previous filterBy for comparison
      setFilterBy({ ...filterBy, previous: filterBy?.current });

      // First render has happened
      setFirstRender(false);
    } else if (
      filterBy?.current &&
      filterBy?.current !== filterBy?.previous &&
      documents?.results
    ) {
      //-> On filter change replace postData with fresh filtered data

      // Update total pages
      handlePagination(documents);

      // Update posts data
      handlePostsDataUpdate(documents.results, false);

      // Updated previous filterBy for comparison
      setFilterBy({ ...filterBy, previous: filterBy?.current });
    } else if (pagination.active && documents?.results) {
      //-> On paginate merge data

      // Update posts data
      handlePostsDataUpdate(documents.results, true);

      // Updated previous filterBy for comparison
      setFilterBy({ ...filterBy, previous: filterBy?.current });

      // Update pagination state
      setPagination({ ...pagination, active: false });
    }
  }, [documents]);

  return (
    <>
      {postsData.length > 0 &&
        postsData.map((post) => <NewsPostPreview {...post} slug={post.uid} key={post.id} />)}
    </>
  );
}
