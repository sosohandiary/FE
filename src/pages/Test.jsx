import React from "react";
import styled from "styled-components";

import BackButtonTitle from "../styles/BackButtonTitle";
import CancelButtonTitle from "../styles/CancelButtonTitle";
import InputButtonStyle from "../styles/InputButtonStyle";

import ProfilePicLarge from "../styles/ProfilePicLarge";
import ProfilePicMedium from "../styles/ProfilePicMedium";
import ProfilePicSmall from "../styles/ProfilePicSmall";

import GrayButtonLarge from "../styles/GrayButtonLarge";
import GrayButtonMedium from "../styles/GrayButtonMedium";
import GrayButtonSmall from "../styles/GrayButtonSmall";

import MintButtonLarge from "../styles/MintButtonLarge";
import MintButtonMedium from "../styles/MintButtonMedium";
import MintButtonSmall from "../styles/MintButtonSmall";

function Test() {
  return (
    <WholeBox>
      <BackButtonTitle />
      <CancelButtonTitle />
      <InputButtonStyle />

      <ProfilePicLarge />
      <ProfilePicMedium />
      <ProfilePicSmall />

      <GrayButtonLarge>저장</GrayButtonLarge>
      <GrayButtonMedium>저장</GrayButtonMedium>
      <GrayButtonSmall>저장</GrayButtonSmall>

      <MintButtonLarge>저장</MintButtonLarge>
      <MintButtonMedium>저장</MintButtonMedium>
      <MintButtonSmall>저장</MintButtonSmall>
    </WholeBox>
  );
}

export default Test;

const WholeBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0px auto;
`; 