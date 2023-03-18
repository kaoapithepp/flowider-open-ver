import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// MUIs
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';

// Utils
import { hideSecond } from "../../../utils/dateReformat";

interface PlaceManageCardPropsContext {
    elem?: any;
    key?: number;
}

export const PlaceManageCard: React.FC<PlaceManageCardPropsContext> = ({ elem }) => {

    const navigate = useNavigate();

    function handleEditEachPlace(){
        navigate(`/edit-place/${elem.place_id}`, { replace: false });
    }
    
    return (
        <PlaceCard onClick={handleEditEachPlace}>
            <img src={elem.image[0]} />
            <div className="info">
                <div>
                    <h3>{elem.place_name}</h3>
                    <p className="description"><LocationOnRoundedIcon /> {elem.description}</p>
                    <p><WatchLaterRoundedIcon /> {hideSecond(elem.open_hr)} - {hideSecond(elem.close_hr)}</p>
                </div>
                <div className="right-wrap">
                    <h4><span>฿{elem.unit_price}</span>/hour</h4>
                    <p className="edit-button">แก้ไข <BorderColorRoundedIcon /></p>
                </div>
            </div>
        </PlaceCard>
    );
}

const PlaceCard = styled.div`
    padding: .6em;

    border-radius: 1em;
    box-shadow: var(--shadow);

    cursor: pointer;

    h3 {
        color: var(--grey-900);
    }

    h4 {
        font-weight: 400;
        color: var(--grey-600);
    }

    span {
        font-weight: 600;
        color: var(--brown);
    }

    p {
        color: var(--grey-800);
        font-size: .8em;
        display: flex;
        align-items: center;
    }

    svg {
        height: .7em;
        color: var(--grey-400);
    }

    img {
        height: 8em;
        width: 100%;
        object-fit: cover;
        border-radius: .5em;
        /* box-shadow: var(--pop-shadow); */
    }

    .info {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .description {
        text-overflow: ellipsis;
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
    }

    .right-wrap {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        gap: .5em;
    }

    .edit-button {
        padding: .5em;
        border: 1px solid var(--grey-400);
        border-radius: .8em;
        color: var(--grey-400);
    }
`;