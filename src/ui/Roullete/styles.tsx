import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 98vh;
`;

export const RaffleButton = styled.button`
  padding: 10px 80px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 8px;
  border: none;

  background: #EB077A;
  box-shadow: 6px 5px 0px 0px #00D6BA;

  color: #FFF;
  font-size: 28px;
  text-transform: uppercase;

  cursor: pointer;

  margin-top: 99px;

  &:hover {
    background: #F91487;
  }
`;