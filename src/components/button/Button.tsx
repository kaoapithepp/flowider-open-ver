import styled from 'styled-components';

export const Button = styled.button`
    background-color: ${props => props.disabled ? "#EC9090" : "#DF4646"};
    padding: 8px 0px;
    margin: 16px 0px;
    width: 100%;
    border-radius: 8px;
    border: none;
    cursor: ${props => props.disabled ? "no-drop": "pointer"};

    text-align: center;
    font-family: var(--brand-font);
    font-size: medium;
    font-weight: 500;
    color: var(--white);

    transition: .3s;

    :hover {
        background-color: ${props => props.disabled ? "#EC9090" : "#D62E2E"};
        transform: scale(101%);
    }
`;