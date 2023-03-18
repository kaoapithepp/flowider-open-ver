import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Global Componets
import LoadingScreen from "../../../components/loading/LoadingScreen";
import { Container } from "../../../components/ui/Container";
import { BackButton } from "../../../components/button/BackButton";
import { Button } from "../../../components/button/Button";
import { InputField } from "../../../components/input/InputField";
import Dropdown from "../../../components/input/Dropdown";

// Context
import { usePlaceEntityValue } from "../../../context/PlaceEntityProvider";

// Utils
import { isThereToken } from "../../../utils/isThereToken";

// Data
import { TIME_ENUM } from "../../../data/TimeEnum";

const PlaceInitPage: React.FC = () => {
    const [isProcess, setIsProcess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { placeEntity, setPlaceEntity } = usePlaceEntityValue();

    const navigate = useNavigate();

    function handleCreatePlace(event: any) {
        event.preventDefault();
        setIsProcess(true);
        if(isThereToken){
            try {
                axios.post(`${import.meta.env.VITE_FLOWY_API_ROUTE}/place/`, placeEntity, {
                    headers: {
                        Authorization: `Bearer ${isThereToken}`
                    }
                })
                .then(res => {
                    if(res.data.info){
                        navigate(`/edit-spec/${res.data.info.place_id}?target=true`, { replace: true });
                    }
                    setIsProcess(false);
                })
            } catch(err: any) {

            }
        }
    }
    
    return (
        <>
            {
                !isLoading ? <LoadingScreen /> :
                <>
                    <BackButton />
                    <Container>
                        <Header>
                            <h1>รายละเอียดของสเปซ</h1>
                        </Header>
                        <Section>
                            <div className="info-section">
                                <div className="section-name">
                                    <h3>ข้อมูลทั่วไป</h3>
                                </div>
                                <FieldCanvas>
                                    <InputField 
                                        label="ชื่อสเปซ"
                                        type="text"
                                        placeholder="ชื่อสเปซ"
                                        callbackVal={(e: string) => setPlaceEntity({...placeEntity, place_name: e})}
                                    />
                                    <InputField 
                                        label="ที่อยู่"
                                        type="text"
                                        placeholder="ที่อยู่"
                                        callbackVal={(e: string) => setPlaceEntity({...placeEntity, description: e})}
                                    />
                                </FieldCanvas>
                            </div>
                            <div className="info-section">
                                <div className="section-name">
                                    <h3>เวลาทำการ</h3>
                                </div>
                                <FieldCanvas>
                                    <Dropdown
                                        label="เวลาเปิด"
                                        placeholder="เวลาเปิด"
                                        data={TIME_ENUM}
                                        callbackVal={(e: string) => setPlaceEntity({...placeEntity, open_hr: e})}
                                    />
                                    <p>ถึง</p>
                                    <Dropdown
                                        label="เวลาปิด"
                                        placeholder="เวลาปิด"
                                        data={TIME_ENUM}
                                        callbackVal={(e: string) => setPlaceEntity({...placeEntity, close_hr: e})}
                                    />
                                </FieldCanvas>
                            </div>
                            <div className="info-section">
                                <div className="section-name">
                                    <h3>ราคาต่อชั่วโมง</h3>
                                </div>
                                <FieldCanvas>
                                    <InputField 
                                        // label="ราคาต่อชั่วโมง"
                                        type="number"
                                        placeholder="บาท/ชั่วโมง"
                                        callbackVal={(e: string) => setPlaceEntity({...placeEntity, unit_price: Number(e)})}
                                    />
                                </FieldCanvas>
                            </div>
                        </Section>
                        <Button onClick={handleCreatePlace} disabled={isProcess}>
                            {
                                isProcess ? "รอสักครู่..." : "ต่อไป"
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

const FieldCanvas = styled.div`
    padding: 1em;

    border-radius: 1em;
    background-color: var(--grey-100);
`;

export default PlaceInitPage;