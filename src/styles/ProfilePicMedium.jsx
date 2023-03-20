import styled from "styled-components";

function ProfilePicMedium() {
  return (
    <CirclePic>
      <Image
        src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FP05yC%2Fbtr4JLp45MW%2FqgFq0HN8WCgDZDCue9Emsk%2Fimg.jpg"
        width={80}
        height={80}
      />
    </CirclePic>
  );
}

export default ProfilePicMedium;

const CirclePic = styled.div`
  border-radius: 40px;
  overflow: hidden;
  width: 80px;
  height: 80px;
`;

const Image = styled.img`
  display: block;
  height: 80px;
  max-width: auto;
`;
