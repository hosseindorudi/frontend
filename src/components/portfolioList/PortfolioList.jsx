import "./portfolioList.scss";

export default function PortfolioList({ title, active, setSelected, id,abortController,fetchData,setType }) {
  return (
    <li
    key={id + title}
      className={active ? "portfolioList active" : "portfolioList"}
      onClick={() => {
        setSelected(title);
        setType("CATPOSTS")
        fetchData({
          method: "GET",
          url: `/api/categories/post/all/${id}`,
          signal: abortController.signal,
        });
      }}
    >
      {title}
    </li>
  );
}
