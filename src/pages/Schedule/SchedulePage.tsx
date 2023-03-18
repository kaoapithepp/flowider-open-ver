import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Global Components
import { BackButton } from "../../components/button/BackButton";
import { Container } from "../../components/ui/Container";
import LoadingScreen from "../../components/loading/LoadingScreen";

// Components
import { ScheduleCard } from "./components/ScheduleCard";

// Utils
import { isThereToken } from "../../utils/isThereToken";

const SchedulePage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [allBelongSchedule, setAllBelongSchedule] = useState<any>([]);

    const { placeId } = useParams();

    useEffect(() => {
        try {
            if(isThereToken){
                axios.get(`${import.meta.env.VITE_FLOWY_API_ROUTE}/schedule/${placeId}`, {
                    headers: {
                        Authorization: `Bearer ${isThereToken}`
                    }
                })
                .then(res => {
                    setAllBelongSchedule(res.data);
                    setIsLoading(false);
                }, (unres) => {
                    alert(unres.response.data);
                })
            }
        } catch(err: any) {
            alert(err.message);
        }
    },[]);
    
    return (
        <>
            {
                isLoading ? <LoadingScreen /> :
                <>
                    <BackButton />
                    <Container>
                        <Header>
                            <h1>ตารางวันนี้</h1>
                        </Header>
                        <StatsCard>
                            <div className="stats">
                                <h2 className="today">
                                    {
                                        allBelongSchedule
                                        .filter((elem: any) => {
                                            return elem.status !== "canceled"
                                        })
                                        .reduce((acc: any, curr: any) => acc+1, 0)
                                    }
                                </h2>
                                <p>today</p>
                            </div>
                            {/* <div className="split-line" /> */}
                            <div className="stats">
                                <h2 className="canceled">
                                    {
                                        allBelongSchedule
                                        .filter((elem: any) => {
                                            return elem.status === "canceled"
                                        })
                                        .reduce((acc: any, curr: any) => acc+1, 0)
                                    }
                                </h2>
                                <p>canceled</p>
                            </div>
                        </StatsCard>
                        <Schedule>
                            <h4>ที่จะถึงนี้</h4>
                            <div className="schedule-cards">
                                {
                                    allBelongSchedule.length == 0 ? <p className="no-results">วันนี้ยังไม่มีรายการจองเข้ามา</p> :
                                    allBelongSchedule.map((elem: any, key: number) => {
                                        return <ScheduleCard elem={elem} key={key} />
                                    })
                                }
                            </div>
                        </Schedule>
                    </Container>
                </>  
            }
        </>
    )
}

const Header = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    margin-top: 5em;

    h1 {
        line-height: 1.2em;
        font-size: 2em;
        font-weight: 600;
        text-align: center;
        color: var(--grey-900);
        width: 80%;
    }
`;

const StatsCard = styled.div`
    border-radius: 1.5em;
    background-color: var(--pure-white);
    box-shadow: var(--shadow);

    padding: .5em;
    margin-top: 2em;

    display: grid;
    grid-template-columns: 1fr 1fr;
    /* justify-content: center;
    align-items: center; */
    gap: 1em;

    .stats {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h2 {
            color: var(--grey-900);
        }

        p {
            color: var(--grey-600);
        }
    }
`;

const Schedule = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 2em;

    h4 {
        font-weight: 600;
        color: var(--grey-900);
    }

    .schedule-cards {
        display: flex;
        flex-direction: column;
    }

    .no-results {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;

        color: var(--grey-400);
        text-align: center;
    }

`

export default SchedulePage;