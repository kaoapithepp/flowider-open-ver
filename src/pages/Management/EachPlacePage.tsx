import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Global Components
import LoadingScreen from "../../components/loading/LoadingScreen";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/button/Button";
import { BackButton } from "../../components/button/BackButton";
import { InputField } from "../../components/input/InputField";
import Dropdown from "../../components/input/Dropdown";

// Utils
import { isThereToken } from "../../utils/isThereToken";
import { cacheImages } from "../../utils/cacheImages";
import { hideSecond } from "../../utils/dateReformat";

// Data
import { TIME_ENUM } from "../../data/TimeEnum";

const EachPlacePage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isProcess, setIsProcess] = useState(false);
    const [placeInfo, setPlaceInfo] = useState<any>({});

    const [isEditGeneralInfo, setIsEditGeneralInfo] = useState(false);
    const [isEditTime, setIsEditTime] = useState(false);
    const [isEditUnitPrice, setIsEditUnitPrice] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(isThereToken){
            try {
                
                axios.get(`${import.meta.env.VITE_FLOWY_API_ROUTE}/place/f/${id}`, {
                    headers: {
                        Authorization: `Bearer ${isThereToken}`
                    }
                })
                .then(res => {
                    setPlaceInfo(res.data);
                    cacheImages(res.data.image);
                    setIsLoading(false);
                }, (unres) => {
                    alert(unres.response.data);
                })
            } catch(err: any) {
                alert(err.message);
            }
        }
    },[placeInfo]);

    async function handleUpdatePlaceInfo(event: any){
        event.preventDefault();
        setIsProcess(true);
        try {
            axios.put(`${import.meta.env.VITE_FLOWY_API_ROUTE}/place/f/${id}`, placeInfo, {
                headers: {
                    Authorization: `Bearer ${isThereToken}`
                }
            })
            .then(res => {
                window.location.reload();
            })
        } catch(err: any) {
            alert(err.message);
        }

    }

    function handleNavigateToImage() {
        navigate(`/place-images/${id}`, { replace: false })
    }

    function handleNavigateToSpec(){
        navigate(`/edit-spec/${id}`, { replace: false });
    }
    
    function handleNavigateToAmenity(){
        navigate(`/edit-amenity/${id}`, { replace: false });
    }

    function handleNavigateToNewDesk(){
        window.scrollTo(0,0);
        navigate(`/desk-init/${id}`, { replace: false });
    }

    return (
        <>
            {
                isLoading ? <LoadingScreen /> :
                <>
                    <BackButton precisePath={`/management`}/>
                    <Container>
                        <Header>
                            <h1>{placeInfo.place_name}</h1>
                        </Header>
                        <Section>
                            <div className="info-section">
                                <div className="section-name">
                                    <h3>รูปภาพ</h3>
                                    {/* <p className="edit-info" onClick={handleNavigateToImage}>แก้ไข</p> */}
                                </div>
                                <ImageShowcase>
                                    {
                                        placeInfo.image.map((src: string, key: number) => {
                                            return <img src={src} alt="" key={key} />
                                        })
                                    }
                                </ImageShowcase>
                            </div>
                            <div className="info-section">
                                <div className="section-name">
                                    <h3>ข้อมูลทั่วไป</h3>
                                    <p className="edit-info" onClick={e =>  setIsEditGeneralInfo(!isEditGeneralInfo)}>
                                        {
                                            isEditGeneralInfo ? "ยกเลิก" : "แก้ไข"
                                        }
                                    </p>
                                </div>
                                {
                                    isEditGeneralInfo ? 
                                    <FieldCanvas>
                                        <InputField 
                                            label="ชื่อสเปซ"
                                            type="text"
                                            placeholder="ชื่อสเปซ"
                                            initVal={placeInfo.place_name}
                                            callbackVal={(e: string) => setPlaceInfo({...placeInfo, place_name: e})}
                                        />
                                        <InputField 
                                            label="ที่อยู่"
                                            type="text"
                                            placeholder="ที่อยู่"
                                            initVal={placeInfo.description}
                                            callbackVal={(e: string) => setPlaceInfo({...placeInfo, description: e})}
                                        />
                                        <Dropdown
                                            label="ประเภทสเปซ"
                                            placeholder="ประเภทสเปซ"
                                            data={['House/Privates', 'Hotel', 'Cafe']}
                                            callbackVal={(e: string) => setPlaceInfo({...placeInfo, place_category: e})}
                                            initValue={['House/Privates', 'Hotel', 'Cafe'].find(elem => elem == placeInfo.place_category)}
                                        />
                                        <Button onClick={handleUpdatePlaceInfo} disabled={isProcess}>ยืนยันการแก้ไข</Button>
                                    </FieldCanvas> :
                                    <>
                                        <p>{placeInfo.place_name}</p>
                                        <p>{placeInfo.description}</p>
                                        <p>ประเภท {placeInfo.place_category}</p>
                                    </>
                                }
                            </div>
                            <div className="info-section">
                                <div className="section-name">
                                    <h3>เวลาทำการ</h3>
                                    <p className="edit-info" onClick={e => setIsEditTime(!isEditTime)}>
                                        {
                                            isEditTime ? "ยกเลิก" : "แก้ไข"
                                        }
                                    </p>
                                </div>
                                {
                                    isEditTime ? 
                                    <FieldCanvas>
                                        <Dropdown
                                            label="เวลาเปิด"
                                            placeholder="เวลาเปิด"
                                            data={TIME_ENUM}
                                            callbackVal={(e: string) => setPlaceInfo({...placeInfo, open_hr: e})}
                                            initValue={TIME_ENUM.find(elem => elem == placeInfo.open_hr.substr(0,5))}
                                        />
                                        <p>ถึง</p>
                                        <Dropdown
                                            label="เวลาปิด"
                                            placeholder="เวลาปิด"
                                            data={TIME_ENUM}
                                            callbackVal={(e: string) => setPlaceInfo({...placeInfo, close_hr: e})}
                                            initValue={TIME_ENUM.find(elem => elem == placeInfo.close_hr.substr(0,5))}
                                        />
                                        <Button onClick={handleUpdatePlaceInfo} disabled={isProcess}>ยืนยันการแก้ไข</Button>
                                    </FieldCanvas> :
                                    <p>{hideSecond(placeInfo.open_hr)} ถึง {hideSecond(placeInfo.close_hr)}</p>
                                }
                            </div>
                            <div className="info-section">
                                <div className="section-name">
                                    <h3>ราคาต่อชั่วโมง</h3>
                                    <p className="edit-info" onClick={e => setIsEditUnitPrice(!isEditUnitPrice)}>
                                        {
                                            isEditUnitPrice ? "ยกเลิก" : "แก้ไข"
                                        }
                                    </p>
                                </div>
                                {
                                    isEditUnitPrice ? 
                                    <FieldCanvas>
                                        <InputField 
                                            label="ราคาต่อชั่วโมง"
                                            type="text"
                                            placeholder="บาท/ชั่วโมง"
                                            initVal={placeInfo.unit_price}
                                            callbackVal={(e: string) => setPlaceInfo({...placeInfo, unit_price: e})}
                                        />
                                        <Button onClick={handleUpdatePlaceInfo} disabled={isProcess}>ยืนยันการแก้ไข</Button>
                                    </FieldCanvas> :
                                    <p>{placeInfo.unit_price} บาท/ชั่วโมง</p>
                                }
                            </div>
                            <div className="info-section">
                                <div className="section-name">
                                    <h3>ความเฉพาะเจาะจง</h3>
                                    <p className="edit-info" onClick={handleNavigateToSpec}>แก้ไข</p>
                                </div>
                            </div>
                            <div className="info-section">
                                <div className="section-name">
                                    <h3>สิ่งอำนวยความสะดวก</h3>
                                    <p className="edit-info" onClick={handleNavigateToAmenity}>แก้ไข</p>
                                </div>
                            </div>
                            <div className="info-section">
                                <div className="section-name">
                                    <h3>ประเภทโต๊ะที่มีในสเปซ</h3>
                                    <p className="edit-info" onClick={handleNavigateToNewDesk}>เพิ่ม</p>
                                </div>
                                <div className="desk-showcase">
                                    {
                                        placeInfo.desk.map((elem: any, key: number) => {
                                            return (
                                                <DeskCard key={key} bgImg={elem.img_uri} onClick={() => navigate(`/edit-desk/${elem.desk_id}`, { replace: false })}>
                                                    <p>{elem.desk_name}</p>
                                                </DeskCard>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </Section>
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

    .section-name {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .edit-info {
        color: var(--grey-600) !important;
        text-decoration: underline;
        cursor: pointer;
    }

    .desk-showcase {
        margin-top: 1em;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1em;
    }
`;

const ImageShowcase = styled.div`
    margin-top: 1em;
    overflow-x: scroll;
    white-space: nowrap;
    position: relative;

    img {
        height: 8em;
        aspect-ratio: 16/9;
        border-radius: 1em;
        object-fit: cover;
        margin-right: .5em;
    }
`;

const FieldCanvas = styled.div`
    padding: 1em;

    border-radius: 1em;
    background-color: var(--grey-100);
`;

const DeskCard = styled.div<any>`
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3) 150%), ${props => `url(${props.bgImg}) no-repeat center`};
    background-size: cover;
    box-sizing: border-box;
    
    padding: 1em;
    border-radius: 1em;
    
    width: 100%;

    cursor: pointer;
    
    p {
        color: var(--white) !important;
        font-size: 1.2em;
        font-weight: 500;
        text-align: center;
    }
`;

export default EachPlacePage;