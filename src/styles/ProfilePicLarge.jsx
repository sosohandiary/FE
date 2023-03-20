import styled from "styled-components";

function ProfilePicLarge() {
  return (
    <CirclePic>
      <Image
        src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FP05yC%2Fbtr4JLp45MW%2FqgFq0HN8WCgDZDCue9Emsk%2Fimg.jpg"
        width={120}
        height={120}
      />
    </CirclePic>
  );
}

export default ProfilePicLarge;

const CirclePic = styled.div`
  border-radius: 60px;
  overflow: hidden;
  width: 120px;
  height: 120px;
`;

const Image = styled.img`
  display: block;
  height: 120px;
  max-width: auto;
`;
