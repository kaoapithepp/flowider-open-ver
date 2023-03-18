import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Global Components
import LoadingScreen from "../../components/loading/LoadingScreen";
import { NavBar } from "../../components/navbar/NavBar";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/button/Button";
import { PlaceManageCard } from "./components/PlaceManageCard";

// Utils
import { isThereToken } from "../../utils/isThereToken";
import { cacheImages } from "../../utils/cacheImages";

const ManagePage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [allBelongPlace, setAllBelongPlace] = useState<any>([]);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        if(isThereToken) {
            try {
                axios.get(`${import.meta.env.VITE_FLOWY_API_ROUTE}/place/`, {
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
                })
            } catch(err: any) {
                alert(err.message);
            }
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
                            <h1>จัดการสเปซ</h1>
                        </Header>
                        <ResultsCaption>
                            <p>สเปซทั้งหมด {allBelongPlace.length} รายการ</p>
                        </ResultsCaption>
                        <Button onClick={() => navigate("/onboard-space", { replace: false })}>สร้างสเปซใหม่ +</Button>
                        <PlaceSection>
                            {
                                allBelongPlace.map((elem: any, key: number) => {
                                    return <PlaceManageCard elem={elem} key={key} />
                                })
                            }
                        </PlaceSection>
                    </Container>
                </>
            }
        </>
    )
}

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
`;

const PlaceSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    
    margin-bottom: 5em;
`;

export default ManagePage;