import { styled } from "styled-components";

const ButtonStyle = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  border-radius: 5px;
  &:hover {
    background-color: #45a049;
  }
`;

type ButtonPropsType = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  value?: string;
  className?: string;
};

export const Button = ({
  type,
  onClick,
  value,
  className,
}: ButtonPropsType) => {
  return (
    <ButtonStyle onClick={onClick} type={type} className={className}>
      {value}
    </ButtonStyle>
  );
};
