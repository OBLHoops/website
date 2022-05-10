import { useEffect } from "react";
import Link from "next/link";
import { createClient } from "@root/prismicio";
import { PrismicRichText } from "@prismicio/react";
import { asDate } from "@prismicio/helpers";
import CustomHead from "@components/Head";
import ContentContainer from "@components/ContentContainer";
import Picture from "@components/Picture";
import { classNames } from "@lib/utilities";
import { getLayout } from "@components/Layout/PageLayout";
import { newsGraphQuery } from "@queries/index";
import { newsFilters } from "@lib/filters";
import Listbox from "@components/Listbox";
import { useSharedState } from "@lib/useSharedState";
import NewsPostResults from "@components/NewsPostResults";
import styles from "@styles/News.module.scss";

export default function News({ pageData, defaultMetaData }) {
  const dateOptions = { month: "long", day: "numeric", year: "numeric" };

  const [filterBy, setFilterBy] = useSharedState("filterBy", {
    current: "view all"
  });
  const [pagination, setPagination] = useSharedState("pagination", {
    current: 1,
    total: 1,
    active: false,
    available: true
  });

  const handlePagination = () => {
    if (pagination.current <= pagination.total) {
      setPagination({ ...pagination, current: pagination.current + 1, active: true });
    }
  };

  const handleFilter = (value) => {
    value === "view all"
      ? setFilterBy({ ...filterBy, current: "view all" })
      : setFilterBy({ ...filterBy, current: value });
    setPagination({ ...pagination, current: 1 });
  };

  useEffect(() => {
    if (pagination.total && pagination.current >= pagination.total) {
      setPagination({ ...pagination, available: false });
    } else {
      setPagination({ ...pagination, available: true });
    }
  }, [pagination]);

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
          <Listbox
            onSelect={(value) => handleFilter(value)}
            activeFilter={filterBy.current}
            options={newsFilters}
          />
        </div>

        <>
          <div className={styles.newsPostsResults}>
            <div className={styles.grid}>
              <NewsPostResults key={filterBy.current} />
            </div>
          </div>
          <button
            onClick={handlePagination}
            className={classNames([
              styles.button,
              styles.fill,
              !pagination.available && styles.disabled
            ])}
            disabled={!pagination.available}
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

News.getLayout = getLayout;
