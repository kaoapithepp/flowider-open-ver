import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Global Components
import LoadingScreen from "../../components/loading/LoadingScreen";
import { Container } from "../../components/ui/Container";
import { BackButton } from "../../components/button/BackButton";
import { Button } from "../../components/button/Button";

// Components
import { SpecCard } from "./components/SpecCard";

// Utils
import { isThereToken } from "../../utils/isThereToken";

// MUIs
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';
import LandscapeIcon from '@mui/icons-material/Landscape';

interface NavigateProps {
    targetPath?: string;
}

const EachSpecPage: React.FC<NavigateProps> = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isProcess, setIsProcess] = useState(false);
    const [specsInfo, setSpecsInfo] = useState<any>({});

    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const targetPath = searchParams.get('target');

    useEffect(() => {
        if(isThereToken){
            try {
                axios.get(`${import.meta.env.VITE_FLOWY_API_ROUTE}/place/f/specs/${id}`, {
                    headers: {
                        Authorization: `Bearer ${isThereToken}`
                    }
                })
                .then(res => {
                    setSpecsInfo(res.data);
                    setIsLoading(false);
                })
            } catch(err: any) {
                alert(err.message);
            }
        }
    },[]);

    async function handleUpdateSpecs(event: any) {
        event.preventDefault();
        setIsProcess(true);
        try {
            axios.put(`${import.meta.env.VITE_FLOWY_API_ROUTE}/place/f/specs/${id}`, specsInfo, {
                headers: {
                    Authorization: `Bearer ${isThereToken}`
                }
            })
            .then(res => {
                if(res.data){
                    navigate(targetPath ? `/edit-amenity/${id}?target=true` : `/edit-place/${id}`, { replace: false });
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
                            <h1>ความเฉพาะเจาะจง</h1>
                        </Header>
                        <Section>
                            <div className="info-section">
                                <h3>สเปซของเราเป็นอย่างไร (หลายตัวเลือก)</h3>
                                <div className="section-card">
                                    <SpecCard
                                        icon={<SmokingRoomsIcon />}
                                        headline="สูบบุหรี่ได้"
                                        describe="สเปซมีพื้นที่สูบบุหรี่ให้บริการ"
                                        initVal={specsInfo.isSmokable}
                                        callbackVal={(e: any) => setSpecsInfo({...specsInfo, isSmokable: e})}
                                    />
                                    <SpecCard
                                        icon={<VolumeUpIcon />}
                                        headline="ใช้เสียงดังได้"
                                        describe="การใช้เสียงของผู้เช่าจะไม่รบกวนผู้อื่นแน่นอน"
                                        initVal={specsInfo.isLoudable}
                                        callbackVal={(e: any) => setSpecsInfo({...specsInfo, isLoudable: e})}
                                    />
                                    <SpecCard
                                        icon={<VoiceOverOffIcon />}
                                        headline="เงียบพิเศษ"
                                        describe="ต้องการความเงียบมากกว่าปกติ เช่น ห้องสมุด ฯลฯ"
                                        initVal={specsInfo.isQuiet}
                                        callbackVal={(e: any) => setSpecsInfo({...specsInfo, isQuiet: e})}
                                    />
                                    <SpecCard
                                        icon={<LandscapeIcon />}
                                        headline="บรรยากาศดี"
                                        describe="เหมาะกับการพักผ่อนและทำงานไปพร้อมกัน"
                                        initVal={specsInfo.isAtmospheric}
                                        callbackVal={(e: any) => setSpecsInfo({...specsInfo, isAtmospheric: e})}
                                    />
                                </div>
                            </div>
                        </Section>
                        <Button onClick={handleUpdateSpecs} disabled={isProcess}>
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

export default EachSpecPage;