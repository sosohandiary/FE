import styled from "styled-components";
import { disableColor, subColor1 } from "../constants/colorPalette";

export const GrayButtonLarge = styled.button`
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

export const GrayButtonMedium = styled.button`
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

export const GrayButtonSmall = styled.button`
  color: black;
  background-color: rgb(${disableColor});
  width: 100px;
  height: 35px;
  border: none;
  border-radius: 5px;
  margin: 0px auto;
  font-weight: 700;
  font-size: 100%;
  cursor: pointer;
`;

export const MintButtonLarge = styled.button`
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

export const MintButtonLargeForSubmitInput = styled(MintButtonLarge)`
  input {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
`;

export const MintButtonMedium = styled.button`
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

export const MintButtonSmall = styled.button`
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
