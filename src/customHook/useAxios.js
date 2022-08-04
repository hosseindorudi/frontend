import { useState } from "react";
import axios from "axios";


axios.defaults.baseURL = "http://localhost:5000";

const useAxios = () => {
    const [response, setResponse] = useState(undefined);

    const [loading, setLoading] = useState(false);
    
    // const toastError = (error) => {
    //     toast.error(error, {
    //       position: toast.POSITION.BOTTOM_CENTER,
    //     });
    //     setResponse(null);
    //   };

      const fetchData = async (params) => {
        try {
          setLoading(true);
          const result = await axios.request(params);
          const data=result.data
            setResponse(data);
        } catch (error) {
          console.log(error.message);
        } finally {
          setLoading(false);
         
        }
      };
      return [response, loading, fetchData, setResponse];
}

export default useAxios;