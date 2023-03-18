import styled from "styled-components";
import { disableColor } from "../constants/colorPalette";

const GrayButtonLarge = styled.button`
  color: black;
  background-color: rgb(${disableColor});
  width: 300px;
  height: 45px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  margin: 0px auto;
  align-items: center;
  font-weight: 700;
  font-size: 100%;
  cursor: pointer;
`;

export default GrayButtonLarge;
