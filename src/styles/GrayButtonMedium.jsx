import styled from "styled-components";
import { disableColor } from "../constants/colorPalette";

const GrayButtonMedium = styled.button`
  color: black;
  background-color: rgb(${disableColor});
  width: 200px;
  height: 40px;
  border: none;
  border-radius: 5px;
  margin: 0px auto;
  font-weight: 700;
  font-size: 100%;
  cursor: pointer;
`;

export default GrayButtonMedium;
