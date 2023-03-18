import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Global Components
import LoadingScreen from "../../components/loading/LoadingScreen";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/button/Button";
import { BackButton } from "../../components/button/BackButton";

// Utils
import { isThereToken } from "../../utils/isThereToken";

// Data
import { AmenityLists } from "../../data/AmenityLists";
import { AmenityCard } from "./components/AmenityCard";

const EachAmenityPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isProcess, setIsProcess] = useState(false);
    const [amenitiesInfo, setAmenitiesInfo] = useState<any>({});

    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const targetPath = searchParams.get('target');

    useEffect(() => {
        if(isThereToken){
            try {
                axios.get(`${import.meta.env.VITE_FLOWY_API_ROUTE}/place/f/amenities/${id}`, {
                    headers: {
                        Authorization: `Bearer ${isThereToken}`
                    }
                })
                .then(res => {
                    setAmenitiesInfo(res.data);
                    setIsLoading(false);
                })
            } catch(err: any) {
                alert(err.message);
            }
        }
    },[]);

    async function handleUpdateAmenities(event: any) {
        event.preventDefault();
        setIsProcess(true);
        try {
            axios.put(`${import.meta.env.VITE_FLOWY_API_ROUTE}/place/f/amenities/${id}`, amenitiesInfo, {
                headers: {
                    Authorization: `Bearer ${isThereToken}`
                }
            })
            .then(res => {
                if(res.data){
                    navigate(targetPath ? `/place-images/${id}?target=true` : `/edit-place/${id}`, { replace: false });
                    setIsProcess(false);
                }
            })
        } catch(err: any) {
            alert(err.message);
        }
    }
    
    return (
        <>
            {
                isLoading ? <LoadingScreen /> :
                <>
                    <BackButton />
                    <Container>
                        <Header>
                            <h1>สิ่งอำนวยความสะดวก</h1>
                        </Header>
                        <Section>
                            <div className="info-section">
                                <h3>รายการสิ่งของ</h3>
                                <div className="section-card">
                                    {
                                        AmenityLists.map((elem: any, key: number) => {
                                            return <AmenityCard
                                                headline={elem.headline}
                                                initVal={amenitiesInfo[elem.attrib_name]}
                                                callbackVal={(e: any) => setAmenitiesInfo({...amenitiesInfo, [elem.attrib_name]: e})}
                                                icon={elem.attrib_name}
                                                />
                                        })
                                    }
                                </div>
                            </div>
                        </Section>
                        <Button onClick={handleUpdateAmenities} disabled={isProcess}>
                            {
                                isProcess ? "รอสักครู่..." : "บันทึก"
                            }
                        </Button>
                    </Container>
                </>
            }
        </>
    );
}

const Header = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin-top: 5em;

    h1 {
        line-height: 1.2em;
        font-size: 3em;
        font-weight: 600;
        color: var(--grey-900);
        width: 80%;
    }
`;

const Section = styled.div`
    margin-top: 3em;

    .info-section {
        padding: 1.5em 0;
        border-bottom: 1px solid var(--grey-300);
        p {
            color: var(--grey-800);
        }
    }

    .section-card {
        margin-top: 1em;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: .5em;
    }
`;

export default EachAmenityPage;