import axios from "axios";
import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const Oauth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  console.log(code);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/login/kakao`);
  }, []);
  return <div>Oauth</div>;
};

export default Oauth;
