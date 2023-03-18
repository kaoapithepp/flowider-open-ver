import React, { useState } from "react";
import styled from "styled-components";

interface PlaceCategoryCardPropsContext {
    headline?: string;
    describe?: string
    initVal?: any;
    callbackVal?: any;
    icon?: any;
}

export const PlaceCategoryCard: React.FC<PlaceCategoryCardPropsContext> = ({
    headline,
    describe,
    initVal,
    callbackVal,
    icon
}) => {
    const [isSelected, setIsSelected] = useState(initVal || false);

    function handleChangeSelection(){
        setIsSelected(!isSelected);
        callbackVal(!isSelected);
    }

    return (
        <Wrapper
            isSelected={isSelected}
            onClick={handleChangeSelection}
        >
            {icon}
            <h3>{headline}</h3>
            <p>{describe}</p>
        </Wrapper>
    );
}

const Wrapper = styled.div<any>`
    padding: 1em;

    background-color: ${props => props.isSelected ? `var(--grey-100)`: `var(--white)`};
    border-radius: 1em;
    border:  ${props => props.isSelected ? `1px solid var(--grey-900)`: `1px solid var(--grey-200)`};
    box-shadow: ${props => props.isSelected ? `var(--shadow)`: null};

    cursor: pointer;

    h3 {
        font-size: 1em;
    }

    p {
        font-size: 1em;
    }

    svg {
        transform: scale(1.2);
    }
`;