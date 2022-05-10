import { useEffect, useState } from "react";
import { createClient } from "@root/prismicio";
import { PrismicRichText } from "@prismicio/react";
import { asDate } from "@prismicio/helpers";
import CustomHead from "@components/Head";
import ContentContainer from "@components/ContentContainer";
import Picture from "@components/Picture";
import { classNames } from "@lib/utilities";
import { getLayout } from "@components/Layout/PageLayout";
import { watchGraphQuery } from "@queries/index";
import { watchFilters } from "@lib/filters";
import Listbox from "@components/Listbox";
import WatchPostResults from "@components/WatchPostResults";
import styles from "@styles/Watch.module.scss";

export default function Watch({ pageData, defaultMetaData }) {
  const dateOptions = { month: "long", day: "numeric", year: "numeric" };
  const [postsPage, setPostsPage] = useState(1);
  const [totalPostPages, setTotalPostPages] = useState(0);
  const [filterBy, setFilterBy] = useState(null);
  const [paginationActive, setPaginationActive] = useState(true);

  useEffect(() => {
    if (totalPostPages && postsPage >= totalPostPages) {
      setPaginationActive(false);
    } else {
      setPaginationActive(true);
    }
  }, [postsPage, totalPostPages]);

  const handlePagination = () => {
    if (postsPage <= totalPostPages) {
      setPostsPage(postsPage + 1);
    }
  };

  const handleFilter = (value) => {
    value === "view all" ? setFilterBy("view all") : setFilterBy(value);
    setPostsPage(1);
  };

  return (
    <>
      <CustomHead defaultMetaData={defaultMetaData} pageMetaData={pageData.data} />
      <ContentContainer margin="top">
        <PrismicRichText field={pageData.data.title} />
      </ContentContainer>
      <div className={styles.container}>
        {pageData.data.pinnedWatchPost && (
          <div className={styles.pinnedPost}>
            <a
              href={pageData?.data?.pinnedWatchPost?.data?.externalLink.url}
              className={styles.link}
              target="_blank"
              aria-describedby="new-window-2"
              rel="noopener noreferrer"
            >
              {pageData?.data?.pinnedWatchPost?.data?.coverImage && (
                <Picture image={pageData.data.pinnedWatchPost.data.coverImage} />
              )}
              <div>
                <p className={styles.label}>{pageData?.data?.pinnedWatchPost?.data?.source}</p>
                <h2>{pageData?.data?.pinnedWatchPost?.data?.title}</h2>
                <p>
                  {asDate(pageData?.data?.pinnedWatchPost?.data?.postDate).toLocaleString(
                    undefined,
                    dateOptions
                  )}
                </p>
              </div>
            </a>
          </div>
        )}

        <div className={styles.filter}>
          <Listbox
            onSelect={(value) => handleFilter(value)}
            activeFilter={filterBy}
            options={watchFilters}
          />
        </div>

        <>
          <div className={styles.watchPosts}>
            <div className={styles.grid}>
              <WatchPostResults
                filterBy={filterBy}
                resultsPage={postsPage}
                updatePostPages={(num) => setTotalPostPages(num)}
                key={filterBy}
              />
            </div>
          </div>
          <button
            onClick={handlePagination}
            className={classNames([
              styles.button,
              styles.fill,
              !paginationActive && styles.disabled
            ])}
            disabled={!paginationActive}
          >
            show more
          </button>
        </>
      </div>
    </>
  );
}

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });
  // const allTagsData = await client.getTags();
  const pageData = await client.getByUID("watch", "watch", {
    graphQuery: watchGraphQuery
  });
  // const pinnedPostUID = pageData?.data?.pinnedWatchPost?.id;
  // const newsPosts = await client.getByType("news-post", {
  //   orderings: {
  //     field: "my.news-post.postDate",
  //     direction: "desc"
  //   },
  //   q: `[[at(document.type, "news-post")][not(document.id,"${pinnedPostUID}")]]`,
  //   pageSize: 1,
  //   page: 1
  // });

  // Define default tag object
  // const defaultTag = [
  //   {
  //     label: "view all",
  //     slug: "all"
  //   }
  // ];
  // Lower base all tag names, corrects case issues in Prismic
  // const lowerCaseTags = allTagsData.map((tag) => tag.toLowerCase());
  // Remove duplicate tags
  // const removeTagDuplicates = [...new Set(lowerCaseTags)];
  // Define tags object
  // const tagsObject = removeTagDuplicates.map((tag) => ({
  //   label: tag,
  //   slug: slugify(tag, { lower: true })
  // }));
  // Combine defaultTag and tagsObject
  // const allTags = [...defaultTag, ...tagsObject];

  const navData = await client.getByUID("navigation", "navigation");
  const footerData = await client.getByUID("footer", "footer");
  const bannerData = await client.getByUID("banner", "banner");
  const defaultMetaData = await client.getByUID("metadata", "metadata");
  return {
    props: { pageData, navData, footerData, bannerData, defaultMetaData },
    revalidate: 10
  };
}

Watch.getLayout = getLayout;
