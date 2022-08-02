import { useCallback, useEffect, useState } from "react";
import useAxios from "../../customHook/useAxios";
import "./works.scss";

export default function Works() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [response, loading, fetchData] = useAxios();
  const abortController = new AbortController();
  const [type, setType] = useState("")
  const [baners,setBaners] = useState([])
  const PF = "http://localhost:5000/images/"
  useEffect(()=> {
    setType("BANERS")
    fetchData({
      method: "GET",
      url: "/api/baners/all",

      signal: abortController.signal,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleResponse = useCallback((response, type)=> {
    switch (type) {
      case "BANERS":
        setBaners(response) 
        console.log(response) 
        break;
    
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[type])

  
  useEffect(() => {
    response && handleResponse(response, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, handleResponse]);



  const handleClick = (way) => {
    way === "left"
      ? setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 2)
      : setCurrentSlide(currentSlide < baners.length - 1 ? currentSlide + 1 : 0);
  };
  
  return (
    <>
    {!loading && <div className="works" id="works">
      <div
        className="slider"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {baners.map((d, i) => (
          <div className="container" >
            <div className="item">
              <div className="left">
                <div className="leftContainer">
                  <h2>{d.title}</h2>
                  <p>{d.desc}</p>
                  <span>Projects</span>
                </div>
              </div>
              <div className="right">
                {console.log(d?.coverPic?.split("/")[0]?.split("\\")[1])}
                <img
                  src={PF + d?.coverPic?.split("/")[0]?.split("\\")[1]}
                  alt=""
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <img
        src="assets/arrow.png"
        className="arrow left"
        alt=""
        onClick={() => handleClick("left")}
      />
      <img
        src="assets/arrow.png"
        className="arrow right"
        alt=""
        onClick={() => handleClick()}
      />
    </div>}
    </>
  );
}
