import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// Global Components
import { NavBar } from "../../components/navbar/NavBar";
import LoadingScreen from "../../components/loading/LoadingScreen";
import { PlaceSquareCard } from "./components/PlaceSquareCard";

// utils
import { isThereToken } from "../../utils/isThereToken";
import { cacheImages } from "../../utils/cacheImages";

const DashboardPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [allBelongPlace, setAllBelongPlace] = useState<any>([]);
 
    useEffect(() => {
        setIsLoading(true);
        if(isThereToken){
            axios.get(`${import.meta.env.VITE_FLOWY_API_ROUTE}/place`, {
                headers: {
                    Authorization: `Bearer ${isThereToken}`
                }
            })
            .then(res => {
                setAllBelongPlace(res.data);

                if(allBelongPlace.length > 0) {
                    allBelongPlace.map((elem: any, key: number) => {
                        cacheImages(elem.image);
                    })
                }

                setIsLoading(false);

            }, (unres) => {
                alert(unres.response.data);
            });
        }
    },[]);

    return (
        <>
            {
                isLoading ? <LoadingScreen /> : 
                <>
                    <NavBar />
                    <Container>
                        <Header>
                            <h1>จัดการรายการจอง</h1>
                        </Header>
                        <ResultsCaption>
                            <p>สเปซทั้งหมด {allBelongPlace.length} รายการ</p>
                        </ResultsCaption>
                        <Section>
                            {
                                allBelongPlace.length == 0 ? <p className="no-results">คุณยังไม่มีสเปซ เริ่มสร้างตอนนี้เลย!</p> :
                                allBelongPlace.map((elem: any, key: number) => {
                                    return <PlaceSquareCard elem={elem} key={key} />
                                })
                            }
                        </Section>
                    </Container>
                </>
            }
        </>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.5em;
    max-width: 800px;
    margin: 0 auto; 
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    /* margin-top: 5em; */

    h1 {
        line-height: 1.2em;
        font-size: 3em;
        font-weight: 600;
        color: var(--grey-900);
        width: 80%;
    }
`;

const ResultsCaption = styled.div`
    p {
        color: var(--grey-600);
    }
`

const Section = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;

    margin-top: 2em;

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

export default DashboardPage;
