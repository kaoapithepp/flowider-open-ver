import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Global Components
import { Container } from '../../../components/ui/Container';
import { BackButton } from '../../../components/button/BackButton';
import { Button } from '../../../components/button/Button';
import LoadingScreen from '../../../components/loading/LoadingScreen';

// Components
import ChooseMap from './components/ChooseMap';

// Utils
import { isThereToken } from '../../../utils/isThereToken';

const PlaceLocatePage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [latitude, setLatitude] = useState(0);
    const [longtitude, setLongtitude] = useState(0);

    const { id } = useParams();
    const navigate = useNavigate();

    const handleLocationSelected = (lat: number, lng: number) => {
        // console.log("Location selected:", lat, lng);
        setLatitude(lat);
        setLongtitude(lng);
    };
    
    async function handleAcceptedCoordinates(event: any){
        event.preventDefault();
        setIsLoading(true);
        if(isThereToken){
            try {
                axios.put(`${import.meta.env.VITE_FLOWY_API_ROUTE}/place/f/${id}`,
                {
                    lat_geo: latitude,
                    long_geo: longtitude
                }, {
                    headers: {
                        Authorization: `Bearer ${isThereToken}`
                    }
                })
                .then(res => {
                    if(res.data){
                        navigate(`/desk-init/${id}?target=true`, { replace: true });
                    }
                    setIsLoading(false);
                })
            } catch(err: any) {
                alert(err.message);
            }
        }
    }

    return(
        <>
            {
                isLoading ? <LoadingScreen /> :
                <>
                    <BackButton />
                    <Container>
                        <Header>
                            <h1>ตำแหน่งสเปซของคุณ?</h1>
                            <p>เลือกตำแหน่งด้วยการเลื่อนหมุดไปยังสถานที่</p>
                        </Header>
                        <div className='position-map'>
                            <ChooseMap onLocationSelected={handleLocationSelected} />
                        </div>
                        <Button onClick={handleAcceptedCoordinates}>ยืนยันพิกัด</Button>
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
    margin-top: 3em;
    margin-bottom: 1em;

    h1 {
        line-height: 1.2em;
        font-size: 2em;
        font-weight: 600;
        color: var(--grey-900);
    }

    p {
        color: var(--grey-600);
    }
`;

export default PlaceLocatePage;