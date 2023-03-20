import styled from "styled-components";

export const ProfilePicLarge = (src) => {
  return (
    <CirclePic size={"large"}>
      <Image src={src} width={120} height={120} size={"large"} />
    </CirclePic>
  );
};

export const ProfilePicMedium = (src) => {
  return (
    <CirclePic size={"medium"}>
      <Image src={src} width={80} height={80} size={"medium"} />
    </CirclePic>
  );
};

export const ProfilePicSmall = (src) => {
  return (
    <CirclePic size={"small"}>
      <Image src={src} size={"small"} />
    </CirclePic>
  );
};

const CirclePic = styled.div`
  border-radius: ${({ size }) => {
    size === "large" ? "60px" : "medium" ? "40px" : "28px";
  }};
  overflow: hidden;
  width: ${({ size }) => {
    size === "large" ? "120px" : "medium" ? "80px" : "56px";
  }};
  height: ${({ size }) => {
    size === "large" ? "120px" : "medium" ? "80px" : "56px";
  }};
`;

const Image = styled.img`
  display: block;
  width: ${({ size }) => {
    size === "large" ? "120px" : "medium" ? "80px" : "56px";
  }};
  height: ${({ size }) => {
    size === "large" ? "120px" : "medium" ? "80px" : "56px";
  }};
  max-width: auto;
`;
