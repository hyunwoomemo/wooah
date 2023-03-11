import styled from "@emotion/styled";
import React from "react";

const FilterCateogry = () => {
  return (
    <Base>
      <CategoryWrapper>
        <CategoryItem>🍼 분유 : 300ml</CategoryItem>
        <CategoryItem>💤 잠: 7시간</CategoryItem>
      </CategoryWrapper>
    </Base>
  );
};

const Base = styled.div`
  padding: 1rem;
  list-style: none;
`;

const CategoryWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  overflow: hidden;
`;

const CategoryItem = styled.li`
  padding: 4px 15px;
  border-radius: 5px;
  white-space: nowrap;
`;

export default FilterCateogry;
