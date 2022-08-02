import { useCallback, useEffect, useState } from "react";
import useAxios from "../../customHook/useAxios";
import "./testimonials.scss";

export default function Testimonials() {
  const [response, loading, fetchData] = useAxios();
  const abortController = new AbortController();
  const [type, setType] = useState("")
  const [intros,setIntros] = useState([])
  const PF = "http://localhost:5000/images/"
  useEffect(()=> {
    setType("INTROS")
    fetchData({
      method: "GET",
      url: "/api/intros/all",

      signal: abortController.signal,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleResponse = useCallback((response, type)=> {
    switch (type) {
      case "INTROS":
        setIntros(response) 
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

  return (
    <>
    {!loading &&

      <div className="testimonials" id="testimonials">
      <h1>Testimonials</h1>
      <div className="container">
        {intros.map((d, i) => (
          <div className={i ===1 ? "card featured" : "card"}>
            
            <div className="top">
              <img src="assets/right-arrow.png" className="left" alt="" />
              <img
                className="user"
                src={PF + d?.coverPic?.split("/")[0]?.split("\\")[1]}
                alt=""
              />
              {/* <img className="right" src={d.icon} alt="" /> */}
            </div>
            <div className="center">
              {d.desc}
            </div>
            <div className="bottom">
              <h3>{d.title}</h3>
              <h4>{d.job}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>

  }
  </>
  );
}
