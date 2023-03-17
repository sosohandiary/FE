import React, { useState } from "react";
import Friendlist from "../components/Friendlist";
import Navigationbar from "../components/Navigationbar";
import Searchbox from "../components/Searchbox";

function Search() {
  return (
    <>
      <Searchbox />
      <Friendlist />
      <Navigationbar />
    </>
  );
}

export default Search;
