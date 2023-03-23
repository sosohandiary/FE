import React, { useState } from "react";
import styled from "styled-components";
import Navigationbar from "../components/Navigationbar";
import Searchbox from "../components/Searchbox";

const NewFriend = () => {
  return (
    <>
      <Searchbox />
      <Navigationbar />
    </>
  );
};

export default NewFriend;
