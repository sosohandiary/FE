import React, { useState } from "react";
import Friendlist from "../components/Friendlist";
import Navigationbar from "../components/Navigationbar";
import Searchbox from "../components/Searchbox";

function Search() {
  return (
    <>
      <Searchbox placeholder="아이디를 검색해 친구를 추가해보세요!" />
      <Friendlist />
      <Navigationbar />
    </>
  );
}

export default Search;
