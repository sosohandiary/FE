import React from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  LongButtonStyle,
  LongButtonSubmitStyle,
} from "../styles/LongButtonStyle";

const Signup = () => {
  // form 관련
  const { register, handleSubmit, watch } = useForm();
  const onSubmit = async (data) => {
    delete data.passwordConfirm;
    console.log(data);
  };

  return (
    <WholeArea>
      <CloseButton>X</CloseButton>
      <SignupTitle>회원가입</SignupTitle>
      <Greeting>
        처음 오셨네요!
        <br />
        간단한 정보를 알려주세요
      </Greeting>
      <InputForm onSubmit={handleSubmit(onSubmit)}>
        <InputLine>
          <label>이름</label>
          <br />
          <input
            type="text"
            {...register("name", {
              required: "이름을 입력해주세요",
            })}
          />
        </InputLine>
        <InputLine>
          <label>생년월일</label>
          <br />
          <input
            type="date"
            {...register("birthday", {
              required: "생년월일를 입력해주세요",
            })}
          />
        </InputLine>
        <InputLine>
          <label>성별</label>
          <br />
          <input
            type="radio"
            name="gender"
            value="male"
            {...register("gender")}
            style={{
              width: "20px",
              height: "20px",
              margin: "5px 5px 5px 10px",
            }}
          />
          남자
          <input
            type="radio"
            name="gender"
            value="female"
            {...register("gender")}
            style={{
              width: "20px",
              height: "20px",
              margin: "0px 5px 0px 10px",
            }}
          />
          여자
        </InputLine>
        <InputLine>
          <label>이메일</label>
          <br />
          <input
            type="email"
            {...register("email", {
              required: "이메일을 입력해주세요",
            })}
          />
        </InputLine>
        <InputLine>
          <label>비밀번호</label>
          <br />
          <input
            type="password"
            {...register("password", {
              required: "비밀번호를 입력해주세요",
            })}
          />
        </InputLine>
        <InputLine>
          <label>비밀번호 확인</label>
          <br />
          <input
            type="password"
            {...register("passwordConfirm", {
              required: "비밀번호 확인을 입력해주세요",
              validate: (val) => {
                if (watch("password") != val) {
                  return "비밀번호가 일치하지 않습니다";
                }
              },
            })}
          />
        </InputLine>
        <LongButtonSubmitStyle style={{ margin: "5px 0px" }}>
          <input type="submit" value="회원가입" />
        </LongButtonSubmitStyle>
      </InputForm>
    </WholeArea>
  );
};

export default Signup;

const WholeArea = styled.div`
  margin: 0 10vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const SignupTitle = styled.span`
  text-align: center;
  font-weight: 700;
`;

const CloseButton = styled.div`
  position: relative;
  top: 20px;
`;

const Greeting = styled.h2`
  margin: 8vh 2vw;
`;

const InputForm = styled.form``;

const InputLine = styled.div`
  label {
    margin-bottom: 50px;
  }
  input {
    margin: 10px 0px;
    width: 300px;
    height: 30px;
  }
`;
