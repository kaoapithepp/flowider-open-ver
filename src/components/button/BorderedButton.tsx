import styled from "styled-components";

export const BorderedButton = styled.button`
    background-color: var(--white);
    color: var(--primary);
    border: 1px solid var(--primary);
    border-radius: 8px;
    padding: 8px 0px;
    margin: 16px 0px;
    width: 100%;
    cursor: pointer;
    
    text-align: center;
    font-size: medium;
    font-family: var(--brand-font);
    font-weight: 500;
    transition: .3s;
    
    :hover {
        transform: scale(101%);
    }
`;