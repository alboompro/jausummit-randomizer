import styled, { css } from "styled-components";

type NameItemProps = {
  key: number;
  identification: number;
};

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

  background: #eb077a;
  box-shadow: 6px 5px 0px 0px #00d6ba;

  color: #fff;
  font-size: 28px;
  text-transform: uppercase;

  cursor: pointer;

  margin-top: 99px;

  &:hover {
    background: #f91487;
  }
`;

export const ListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const NameItem = styled.div<NameItemProps>`
  ${(props) => {
    switch (props.identification) {
      case 0:
        return css`
          color: rgba(244, 241, 244, 0.6);
          font-family: Saira;
          font-size: 30px;
          text-transform: uppercase;
        `;
      case 1:
        return css`
          color: rgba(244, 241, 244, 0.8);
          font-family: Saira;
          font-size: 50px;
          text-transform: uppercase;
        `;
      case 2:
        return css`
          color: #00d6ba;
          font-family: Saira;
          font-size: 100px;
          text-transform: uppercase;
        `;
      case 3:
        return css`
          color: rgba(244, 241, 244, 0.8);
          font-family: Saira;
          font-size: 50px;
          text-transform: uppercase;
        `;
      case 4:
        return css`
          color: rgba(244, 241, 244, 0.6);
          font-family: Saira;
          font-size: 30px;
          text-transform: uppercase;
        `;
      default:
        return css`
          color: rgba(244, 241, 244, 0.6);
          font-family: Saira;
          font-size: 30px;
          text-transform: uppercase;
        `;
    }
  }};
`;

export const ConfettiImage = styled.img`
  position: absolute;
  width: 45%;
`;
