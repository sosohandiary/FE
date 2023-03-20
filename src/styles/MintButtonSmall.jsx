import styled from "styled-components";
import { subColor1 } from "../constants/colorPalette";

const MintButtonSmall = styled.button`
  color: black;
  background-color: rgb(${subColor1});
  width: 100px;
  height: 35px;
  border: none;
  border-radius: 5px;
  margin: 0px auto;
  font-weight: 700;
  font-size: 100%;
  cursor: pointer;
`;

export default MintButtonSmall;
