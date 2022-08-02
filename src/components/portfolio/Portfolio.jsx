import { useEffect, useState } from "react";
import PortfolioList from "../portfolioList/PortfolioList";
import "./portfolio.scss";
import useAxios from "../../customHook/useAxios";
import { useCallback } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Portfolio() {
  const [selected, setSelected] = useState("");
  const [response, loading, fetchData] = useAxios();
  const abortController = new AbortController();
  const [cats, setCats] = useState([]);
  const [type, setType] = useState("");
  const [posts, setPosts] = useState([]);
  const PF = "http://localhost:5000/images/";

  useEffect(() => {
    setType("CATEGORIES");
    fetchData({
      method: "GET",
      url: "/api/categories/categories/all",

      signal: abortController.signal,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResponse = useCallback(
    (response, type) => {
      switch (type) {
        case "CATEGORIES":
          setCats(response);

          setSelected(response[0].title);
          setType("CATPOSTS");
          fetchData({
            method: "GET",
            url: `/api/categories/post/all/${response[0]._id}`,
            signal: abortController.signal,
          });

          break;
        case "CATPOSTS":
          setPosts(response);
          break;

        default:
          break;
      }
      
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    response && handleResponse(response, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, handleResponse]);

  return (
    <>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}


        <div className="portfolio" id="portfolio">
          <h1>Portfolio</h1>
          <ul>
            {cats.map((item) => (
              <PortfolioList
                title={item.title}
                active={selected === item.title}
                setSelected={setSelected}
                id={item._id}
                fetchData={fetchData}
                setType={setType}
                abortController={abortController}
              />
            ))}
          </ul>
          <div className="container">
            {posts?.map((d) => (
              <div className="item" key={d.title + d._id}>
                <img
                  src={PF + d[0]?.coverPic?.split("/")[0]?.split("\\")[1]}
                  alt=""
                />
                <h3>{d[0]?.title}</h3>
              </div>
            ))}
          </div>
        </div>

    </>
  );
}
