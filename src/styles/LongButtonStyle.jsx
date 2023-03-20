import styled from "styled-components";
import { subColor1 } from "../constants/colorPalette";

export const LongButtonStyle = styled.div`
  background-color: rgb(${subColor1});
  width: 300px;
  height: 45px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
`;

export const LongButtonSubmitStyle = styled.div`
  background-color: rgb(${subColor1});
  width: 300px;
  height: 45px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  input {
    width: 100%;
    height: 100%;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
`;
