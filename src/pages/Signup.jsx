import React from "react";
import { useForm } from "react-hook-form";
import { HiOutlineXCircle } from "react-icons/hi";
import styled from "styled-components";
import InputBox from "../components/InputBox";
import { subColor1 } from "../constants/colorPalette";
import BackButtonTitle from "../styles/BackButtonTitle";
import { MintButtonLarge } from "../styles/Buttons";
import { LongButtonSubmitStyle } from "../styles/LongButtonStyle";
import { WholeAreaWithMargin } from "../styles/WholeAreaStyle";

const Signup = () => {
  // form 관련
  const { register, handleSubmit, watch } = useForm();
  const onSubmit = async (data) => {
    delete data.passwordConfirm;
    console.log(data);
  };

  return (
    <WholeAreaWithMargin>
      <BackButtonTitle title={"회원가입"}></BackButtonTitle>
      <Greeting>
        처음 오셨네요!
        <br />
        간단한 정보를 알려주세요
      </Greeting>

      <InputForm onSubmit={handleSubmit(onSubmit)}>
        <label>이름</label>
        <br />
        <Content>
          <input
            type="text"
            {...register("name", {
              required: "생년월일를 입력해주세요",
            })}
          />
          <button>
            <HiOutlineXCircle className="HiOutlineXCircle" />
          </button>
        </Content>
        <label>생년월일</label>
        <br />
        <Content>
          <input
            type="date"
            {...register("birthday", {
              required: "생년월일를 입력해주세요",
            })}
          />
        </Content>
        <label>성별</label>
        <br />
        <input
          type="radio"
          name="gender"
          value="male"
          {...register("gender", { required: "성별을 입력해주세요" })}
          style={{
            width: "20px",
            height: "20px",
            margin: "15px 5px 15px 10px",
          }}
        />
        남자
        <input
          type="radio"
          name="gender"
          value="female"
          {...register("gender", { required: "성별을 입력해주세요" })}
          style={{
            width: "20px",
            height: "20px",
            margin: "0px 5px 0px 10px",
          }}
        />
        여자 <br />
        <label>이메일</label>
        <br />
        <Content>
          <input
            type="email"
            {...register("email", {
              required: "이메일을 입력해주세요",
            })}
          />
          <button>
            <HiOutlineXCircle className="HiOutlineXCircle" />
          </button>
        </Content>
        <label>비밀번호</label>
        <br />
        <Content>
          <input
            type="password"
            {...register("password", {
              required: "비밀번호를 입력해주세요",
            })}
          />
          <button>
            <HiOutlineXCircle className="HiOutlineXCircle" />
          </button>
        </Content>
        <label>비밀번호 확인</label>
        <br />
        <Content>
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
          <button>
            <HiOutlineXCircle className="HiOutlineXCircle" />
          </button>
        </Content>
        <MintButtonLargeInput>
          <input type="submit" value="회원가입" />
        </MintButtonLargeInput>
      </InputForm>
    </WholeAreaWithMargin>
  );
};

export default Signup;

const Greeting = styled.h2`
  margin-top: 4vh;
  position: relative;
  right: 30px;
`;

const InputForm = styled.form``;

const InputLine = styled.div`
  input {
    margin: 10px 0px;
    width: 300px;
    height: 30px;
  }
`;

const Content = styled.div`
  padding: 10px;
  position: relative;
  input {
    box-sizing: border-box;
    height: 30px;
    width: 100%;
    outline: none;
    border-radius: 25px;
    padding: 10px 10px 10px 25px;
    font-size: 16px;
    border: 1px solid #eee;
    background: #f5f5f5;
  }
  button {
    position: absolute;
    font-size: 18px;
    top: 22%;
    right: 3%;
    border: none;
    background: none;
    cursor: pointer;
    .HiOutlineXCircle {
      font-size: 150%;
      color: #d0d0d0;
    }
  }
`;

const MintButtonLargeInput = styled(MintButtonLarge)`
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
