import styled from "@emotion/styled";
import React from "react";

const FilterCateogry = () => {
  return (
    <Base>
      <CategoryWrapper>
        <CategoryItem>πΌ λΆμ  : 300ml</CategoryItem>
        <CategoryItem>π€ μ : 7μκ°</CategoryItem>
      </CategoryWrapper>
    </Base>
  );
};

const Base = styled.div`
  padding: 1rem;
  list-style: none;
  border-bottom: 1px solid #b6b6b6;
`;

const CategoryWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  overflow: hidden;
`;

const CategoryItem = styled.li`
  border-radius: 5px;
  white-space: nowrap;
`;

export default FilterCateogry;
