import React from "react";
import styled from "styled-components";

function MyPage() {
  return (
    <>
      <StLayout>
        <StContainer>
            <Title>마이페이지</Title>
        </StContainer>
      </StLayout>
    </>
  );
}

export default MyPage;

const StLayout = styled.div`
  background: #524f4f;
`;

const StContainer = styled.div`
  background: #fff;

  height: 100vh;
  border-radius: 50px 50px 0px 0px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: black;

  display: flex;
  padding: 10px;
`;