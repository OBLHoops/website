import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { createClient } from "@root/prismicio";
import { PrismicRichText } from "@prismicio/react";
import { asDate } from "@prismicio/helpers";
import slugify from "slugify";
import CustomHead from "@components/Head";
import ContentContainer from "@components/ContentContainer";
import Picture from "@components/Picture";
import { classNames } from "@lib/utilities";
import { getLayout } from "@components/Layout/PageLayout";
import { newsGraphQuery } from "@queries/index";
import Listbox from "@components/Listbox";
import NewsPostResults from "@components/NewsPostResults";
import styles from "@styles/News.module.scss";

export default function News({ pageData, allTags, defaultMetaData }) {
  const dateOptions = { month: "long", day: "numeric", year: "numeric" };
  const router = useRouter();
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

  useEffect(() => {
    if (filterBy === "View All") {
      router.push({ query: { filter: "all" } }, undefined, { shallow: true });
    } else {
      router.push({ query: { filter: filterBy } }, undefined, { shallow: true });
    }
  }, [filterBy]);

  const handlePagination = () => {
    if (postsPage <= totalPostPages) {
      setPostsPage(postsPage + 1);
    }
  };

  const handleFilter = (value) => {
    value === "View All" ? setFilterBy(null) : setFilterBy(value);
    setPostsPage(1);
  };

  return (
    <>
      <CustomHead defaultMetaData={defaultMetaData} pageMetaData={pageData.data} />
      <ContentContainer margin="top">
        <PrismicRichText field={pageData.data.title} />
      </ContentContainer>
      <div className={styles.container}>
        {pageData.data.pinnedNewsPost && (
          <div className={styles.pinnedPost}>
            <Link
              href={`/news/${pageData.data.pinnedNewsPost.uid}`}
              title={pageData.data.pinnedNewsPost.data.title}
              className={styles.link}
              scroll={false}
            >
              <a>
                <Picture image={pageData.data.pinnedNewsPost.data.coverImage} />
                <div>
                  <p className={styles.label}>{pageData.data.pinnedNewsPost.data.source}</p>
                  <h2>{pageData.data.pinnedNewsPost.data.title}</h2>
                  <p>
                    {asDate(pageData.data.pinnedNewsPost.data.postDate).toLocaleString(
                      undefined,
                      dateOptions
                    )}
                  </p>
                </div>
              </a>
            </Link>
          </div>
        )}

        <div className={styles.filter}>
          <Listbox onSelect={(value) => handleFilter(value)} options={allTags} />
        </div>

        <>
          <div className={styles.newsPostsResults}>
            <div className={styles.grid}>
              <NewsPostResults
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
  const allTagsData = await client.getTags();
  const pageData = await client.getByUID("news", "news", {
    graphQuery: newsGraphQuery
  });
  // const pinnedPostUID = pageData?.data?.pinnedNewsPost?.id;
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
  const defaultTag = [
    {
      label: "View All",
      slug: "all"
    }
  ];
  // Lower base all tag names, corrects case issues in Prismic
  const lowerCaseTags = allTagsData.map((tag) => tag.toLowerCase());
  // Remove duplicate tags
  const removeTagDuplicates = [...new Set(lowerCaseTags)];
  // Define tags object
  const tagsObject = removeTagDuplicates.map((tag) => ({
    label: tag,
    slug: slugify(tag, { lower: true })
  }));
  // Combine defaultTag and tagsObject
  const allTags = [...defaultTag, ...tagsObject];

  const navData = await client.getByUID("navigation", "navigation");
  const footerData = await client.getByUID("footer", "footer");
  const bannerData = await client.getByUID("banner", "banner");
  const defaultMetaData = await client.getByUID("metadata", "metadata");
  return {
    props: { pageData, allTags, navData, footerData, bannerData, defaultMetaData },
    revalidate: 10
  };
}

News.getLayout = getLayout;
