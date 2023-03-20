import styled from "styled-components";

function ProfilePicMedium() {
  return (
    <CirclePic>
      <Image
        src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FP05yC%2Fbtr4JLp45MW%2FqgFq0HN8WCgDZDCue9Emsk%2Fimg.jpg"
        width={56}
        height={56}
      />
    </CirclePic>
  );
}

export default ProfilePicMedium;

const CirclePic = styled.div`
  border-radius: 28px;
  overflow: hidden;
  width: 56px;
  height: 56px;
`;

const Image = styled.img`
  display: block;
  height: 56px;
  max-width: auto;
`;
