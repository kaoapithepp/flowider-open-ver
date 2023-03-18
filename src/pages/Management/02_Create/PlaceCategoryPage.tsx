import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Global Components
import LoadingScreen from "../../../components/loading/LoadingScreen";
import { Container } from "../../../components/ui/Container";
import { BackButton } from "../../../components/button/BackButton";
import { Button } from "../../../components/button/Button";

// Components
import { PlaceCategoryCard } from "./components/PlaceCategoryCard";

// Utils
import { isThereToken } from "../../../utils/isThereToken";

// Context
import { usePlaceEntityValue } from "../../../context/PlaceEntityProvider";

// MUIs
import HomeIcon from '@mui/icons-material/Home';
import BedIcon from '@mui/icons-material/Bed';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';

const PlaceCategoryPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isProcess, setIsProcess] = useState(false);

    const { placeEntity, setPlaceEntity } = usePlaceEntityValue();

    const navigate = useNavigate();

    async function handleUpdatePlaceCategoy(event: any) {
        event.preventDefault();

        navigate("/place-init", { replace: false });
    }

    return (
        <>
            {
                !isLoading ? <LoadingScreen /> :
                <>
                    <BackButton />
                    <Container>
                        <Header>
                            <h1>ประเภทสเปซของคุณ</h1>
                        </Header>
                        <Section>
                            <div className="info-section">
                                <h3>เลือก 1 ตัวเลือกเท่านั้น</h3>
                                <div className="section-card">
                                    <PlaceCategoryCard
                                        icon={<HomeIcon />}
                                        headline="บ้าน/พื้นที่ส่วนตัว"
                                        describe="พื้นที่ส่วนตัวของคุณเอง"
                                        callbackVal={(e: any) => setPlaceEntity({...placeEntity, place_category: 'House/Privates'})}
                                    />
                                    <PlaceCategoryCard
                                        icon={<BedIcon />}
                                        headline="โรงแรม/โฮสเทล"
                                        describe="เปลี่ยนห้องที่ไม่ได้ใช้งานให้ทำเงิน"
                                        callbackVal={(e: any) => setPlaceEntity({...placeEntity, place_category: 'Hotel'})}
                                    />
                                    <PlaceCategoryCard
                                        icon={<EmojiFoodBeverageIcon />}
                                        headline="ร้านกาแฟ/คาเฟ่"
                                        describe="สถานที่ยอดนิยมของคนยุคนี้สำหรับการทำงาน"
                                        callbackVal={(e: any) => setPlaceEntity({...placeEntity, place_category: 'Cafe'})}
                                    />
                                </div>
                            </div>
                        </Section>
                        <Button onClick={handleUpdatePlaceCategoy} disabled={isProcess}>
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

export default PlaceCategoryPage;