import React from "react";
import styled from "styled-components";
import { SlMagnifier } from "react-icons/sl";
import { MdOutlineCancel } from "react-icons/md";

//test filter입니다. searchBox에 합치기?
const Filter = ({ setCards, existCards, placeholder }) => {
  // console.log(existCards);
  const handleOnChangeFilterInput = (e) => {
    if (e.target.value == "") return setCards(existCards);
    setCards(existCards.filter((card) => card.nickname === e.target.value));
  };

  return (
    <>
      <SearchTotalBox>
        <SearchStyleBox>
          <SlMagnifier className='SlMagnifier' />
          <SearchStyle>
            <Searchinput
              type='text'
              onChange={handleOnChangeFilterInput}
              placeholder={placeholder}
            />
          </SearchStyle>
          <MdOutlineCancel className='MdOutlineCancel' />
        </SearchStyleBox>
      </SearchTotalBox>


    </>
  );
}

export default Filter;

const SearchTotalBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px 15px 25px 15px;
`;

const SearchStyleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  background-color: #d9d9d948;
  border: none;
  border-radius: 13px;
  padding: 12px 15px 12px 15px;
  .SlMagnifier {
    font-size: 25px;
    color: #7a7a7a;
    padding-left: 5px;
  }
  .MdOutlineCancel {
    font-size: 25px;
    color: #9b9b9b;
    padding-right: 5px;
  }
`;

const SearchStyle = styled.div`
  width: 95%;
  margin-left: 3%;
`;

const Searchinput = styled.input`
  font-size: 16px;
  font-weight: bold;
  background-color: transparent;
  border: none;
  width: 300px;
`;
