import styled from "styled-components";
import { subColor1 } from "../constants/colorPalette";

const MintButtonLarge = styled.button`
  background-color: rgb(${subColor1});
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

export default MintButtonLarge;
