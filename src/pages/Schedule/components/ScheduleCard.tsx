import React from "react";
import styled from "styled-components";

// MUIs
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { dateReformat } from "../../../utils/dateReformat";

interface ScheduleCardPropsContext {
    elem?: any;
    key?: number;
}

export const ScheduleCard: React.FC<ScheduleCardPropsContext> = ({ elem }) => {
    
    return (
        <ScheduleRectCard>
            <div>
                <div className="candidate">
                    <h2>{elem.first_name} {elem.last_name}</h2>
                    <p>{elem.desk_name}</p>
                </div>
                <div>

                </div>
            </div>
            <div className="detail">
                <p><CalendarTodayIcon />{dateReformat(elem.createdAt)}</p>
                <p>{elem.start_time} | {elem.total_bk_hr} hrs</p>
            </div>
        </ScheduleRectCard>
    );
}

const ScheduleRectCard = styled.div`
    margin: .5em 0;
    padding: 1em;

    border: 1px solid var(--grey-300);
    border-radius: 1em;

    background-color: var(--pure-white);
    box-shadow: var(--shadow);

    cursor: pointer;

    .candidate {
        p {
            color: var(--grey-600);
        }
    }

    .detail {
        background-color: var(--green-notion);
        border-radius: 1em;

        padding: .5em .7em;
        margin-top: 1em;

        display: flex;
        justify-content: space-between;

        p {
            font-size: .8em;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: .5em;
        }

        svg {
            width: 16px;
        }
    }
`;