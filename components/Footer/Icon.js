import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.text());

export default function Icon({ url }) {
  const { data, error } = useSWR(url, fetcher);
  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  return <div dangerouslySetInnerHTML={{ __html: data }} />;
}
