import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface PlaceSqaureCardPropsContext {
    elem: any;
}

interface SquareCardPropsContext {
    bgImg?: string;
}

export const PlaceSquareCard: React.FC<PlaceSqaureCardPropsContext> = ({ elem }) => {
    const navigate = useNavigate();
    
    function handleToEntirePlaceClick(e: any){
        e.preventDefault();
        navigate(`/schedule/${elem.place_id}`, { replace: false });
    }

    return (
        <SqaureCard bgImg={elem.image[0]} onClick={handleToEntirePlaceClick}>
            <h2>{elem.place_name}</h2>
        </SqaureCard>
    );
}

const SqaureCard = styled.div<SquareCardPropsContext>`
    border-radius: 2em;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 1) 150%), ${props => `url(${props.bgImg}) no-repeat center`};
    background-size: cover;

    /* max-width: 150px; */
    height: 8em;
    /* aspect-ratio: 1/1; */
    padding: 1em;

    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    transition: .3s;

    cursor: pointer;

    h2 {
        font-size: 1.5em;
        line-height: 1em;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 90%;
        white-space: wrap;
        color: var(--white);
    }

    :hover{
        scale: 1.02;
    }
`;