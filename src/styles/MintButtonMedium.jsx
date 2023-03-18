import styled from "styled-components";
import { subColor1 } from "../constants/colorPalette";

const MintButtonMedium = styled.button`
  color: black;
  background-color: rgb(${subColor1});
  width: 200px;
  height: 40px;
  border: none;
  border-radius: 5px;
  margin: 0px auto;
  font-weight: 700;
  font-size: 100%;
  cursor: pointer;
`;

export default MintButtonMedium;
