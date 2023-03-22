import React from "react";

function Filter({ setCards, existCards, placeholder }) {
  console.log(existCards);
  const handleOnChangeFilterInput = (e) => {
    if (e.target.value == "") return setCards(existCards);
    setCards(existCards.filter((card) => card.nickname === e.target.value));
  };

  return (
    <>
      <input
        type='input'
        onChange={handleOnChangeFilterInput}
        placeholder={placeholder}
      />
    </>
  );
}

export default Filter;
