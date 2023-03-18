import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Global Componets
import LoadingScreen from "../../components/loading/LoadingScreen";
import { Container } from "../../components/ui/Container";
import { BackButton } from "../../components/button/BackButton";
import { Button } from "../../components/button/Button";
import { InputField } from "../../components/input/InputField";
import Dropdown from "../../components/input/Dropdown";

// MUIs
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

// Utils
import { isThereToken } from "../../utils/isThereToken";
import { cacheImages } from "../../utils/cacheImages";
import { BorderedButton } from "../../components/button/BorderedButton";

const EachDeskPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isDeleteDeskOpen, setIsDeleteDeskOpen] = useState(false);

    const [deskEntity, setDeskEntity] = useState<any>({});

    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const { deskId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(isThereToken) {
            axios.get(`${import.meta.env.VITE_FLOWY_API_ROUTE}/desk/f/${deskId}`, {
                headers: {
                    Authorization: `Bearer ${isThereToken}`
                }
            })
            .then(res => {
                // console.log(res.data);
                setDeskEntity(res.data);
                cacheImages(res.data.image);
                setPreviews(res.data.image);
                setIsLoading(false);
            })
        }
    },[]);

    useEffect(() => {
        previews.length == 1 ? setIsDisabled(false) : setIsDisabled(true)
    },[previews]);

    function handleImageChange(e: any) {
        e.preventDefault();
        const files = Array.from(e.target.files || []);
        const newImages = [...images];
        const newPreviews = [...previews];

        files.forEach((file: any) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newImages.push(file);
                newPreviews.push(reader.result as string);
                setImages(newImages);
                setPreviews(newPreviews);
            };
            reader.readAsDataURL(file);
        });
    };

    async function handleDeleteImage(index: any){
        try {
            axios.delete(`${import.meta.env.VITE_FLOWY_API_ROUTE}/desk/desk-img/f/${deskId}`, {
                headers: {
                    Authorization: `Bearer ${isThereToken}`
                }
            })
            .then(res => {
                const newImages = [...images];
                const newPreviews = [...previews];
                newImages.splice(index, 1);
                newPreviews.splice(index, 1);
                setImages(newImages);
                setPreviews(newPreviews);
            })
        } catch (err: any) {
            alert(err.message);
        }
        
    }

    async function handleUpdateImage(deskId: string){
        if (images.length && isThereToken) {
            const formData = new FormData();
            images.forEach((image, index) => {
                formData.append(`image`, image);
            });            
            try {
                axios.put(`${import.meta.env.VITE_FLOWY_API_ROUTE}/desk/desk-img/f/${deskId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${isThereToken}`
                    }
                })
                .then(res => {
                    console.log(res.data.message);
                })
            } catch(err: any) {
                alert(err.message);
            }
        }
    }

    async function handleUpdateDesk(event: any) {
        event.preventDefault();
        setIsLoading(true);
        if(isThereToken){
            try {
                axios.put(`${import.meta.env.VITE_FLOWY_API_ROUTE}/desk/f/${deskId}`, deskEntity, {
                    headers: {
                        Authorization: `Bearer ${isThereToken}`
                    }
                })
                .then(res => {
                    if(res.data.desk_id){
                        handleUpdateImage(res.data.desk_id);
                    }

                    return res.data;
                })
                .then(res => {
                    navigate(`/edit-place/${res.place_id}`, { replace: false });
                    setIsLoading(false);
                })
            } catch(err: any) {
                alert(err.message);
            }
        }
    }

    async function handleDeleteDesk(event: any) {
        event.preventDefault();
        setIsLoading(true);
        if(isThereToken){
            try {
                axios.delete(`${import.meta.env.VITE_FLOWY_API_ROUTE}/desk/f/${deskId}`, {
                    headers: {
                        Authorization: `Bearer ${isThereToken}`
                    }
                })                    
                .then(res => {
                    navigate(`/edit-place/${deskEntity.place_id}`, { replace: true });
                    setIsLoading(false);
                })
            } catch(err: any) {
                alert(err.message);
            }
        }
    }

    function convertHotDeskStatus(text: string){
        return text == "ใช่" ? true : false;
    }
    
    return (
        <>
            {
                isLoading ? <LoadingScreen /> :
                <>
                    <BackButton />
                    <Container>
                        <Header>
                            <h1>{deskEntity.desk_name}</h1>
                        </Header>
                        <Section>
                            <div className="info-section">
                                <div className="section-name">
                                    <h3>รายละเอียดทั่วไป</h3>
                                </div>
                                <FieldCanvas>
                                    <InputField 
                                        initVal={deskEntity.desk_name}
                                        label="ชื่อโต๊ะ"
                                        type="text"
                                        placeholder="ชื่อโต๊ะ"
                                        callbackVal={(e: string) => setDeskEntity({...deskEntity, desk_name: e})}
                                    />
                                    <InputField 
                                        label="คำบรรยายโต๊ะ"
                                        type="text"
                                        placeholder="คำโปรย, เชิญชวน, อธิบาย ฯลฯ"
                                        initVal={deskEntity.description}
                                        callbackVal={(e: string) => setDeskEntity({...deskEntity, description: e})}
                                    />
                                </FieldCanvas>
                            </div>
                            <div className="info-section">
                                <div className="section-name">
                                    <h3>ประเภทของโต๊ะ</h3>
                                </div>
                                <FieldCanvas>
                                    <Dropdown
                                        label="เป็น hot desk หรือไม่?"
                                        placeholder="สถานะ"
                                        data={["ใช่", "ไม่ใช่"]}
                                        initValue={["ใช่", "ไม่ใช่"].find(elem => convertHotDeskStatus(elem) == deskEntity.isHotDesk)}
                                        callbackVal={(e: string) => setDeskEntity({...deskEntity, isHotDesk: convertHotDeskStatus(e)})}
                                    />
                                </FieldCanvas>
                            </div>
                            <div className="info-section">
                                <div className="section-name">
                                    <h3>จำนวนคนเข้าใช้บริการโซนนี้</h3>
                                </div>
                                <FieldCanvas>
                                    <InputField 
                                        label="น้อยสุด"
                                        type="number"
                                        placeholder="จำนวนผู้ใช้บริการน้อยที่สุด (ขั้นต่ำ 1)"
                                        initVal={deskEntity.min_seat}
                                        callbackVal={(e: string) => setDeskEntity({...deskEntity, min_seat: Number(e)})}
                                    />
                                    <InputField 
                                        label="สูงสุด"
                                        type="number"
                                        placeholder="จำนวนผู้ใช้บริการสูงสุด"
                                        initVal={deskEntity.max_seat}
                                        callbackVal={(e: string) => setDeskEntity({...deskEntity, max_seat: Number(e)})}
                                    />
                                </FieldCanvas>
                            </div>
                            <div className="info-section">
                                <div className="section-name">
                                    <h3>รูปภาพของโต๊ะ</h3>
                                </div>
                                <input id="upload-images" type="file" accept="image/*" multiple={false} onChange={handleImageChange} />
                                <div className="img-showcase">
                                    {
                                        previews.length < 1 ? 
                                        <label htmlFor="upload-images">
                                            <UploadField>
                                                <AddPhotoAlternateRoundedIcon />
                                                <p>1 รูปเท่านั้น</p>
                                            </UploadField>
                                        </label> :
                                        previews.map((preview, index) => (
                                            <div className="img-box" key={index}>
                                            <div className="delete-img" onClick={() => handleDeleteImage(index)}>
                                                <RemoveCircleOutlineRoundedIcon />
                                            </div>
                                            <img src={preview} style={{ maxWidth: '100%' }} alt="Preview" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="info-section">
                                <div className="section-name">
                                    <h3>ลบโต๊ะนี้ออกจากสเปซ</h3>
                                </div>
                                <BorderedButton onClick={() => setIsDeleteDeskOpen(!isDeleteDeskOpen)}>
                                    {
                                        isDeleteDeskOpen ?
                                        "ยกเลิก" :
                                        "ท่านแน่ใจที่จะลบแล้วใช่หรือไม่?"
                                    }
                                </BorderedButton>
                                {
                                    isDeleteDeskOpen ?
                                    <p className="confirm-delete" onClick={handleDeleteDesk}>ยืนยันการลบโต๊ะนี้ออกจากสเปซ</p> :
                                    null 
                                }
                            </div>
                        </Section>
                        <Button onClick={handleUpdateDesk} disabled={isDisabled}>บันทึก</Button>
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

    .img-showcase {
        margin-top: 1em;
        display: flex;
        flex-wrap: wrap-reverse;
        justify-content: center;
        align-items: center;
        /* position: relative; */
        
        img {
            height: 8em;
            aspect-ratio: 16/9;
            border-radius: 1em;
            object-fit: cover;
            margin-right: .5em;
        }

        .img-box {
            position: relative;
        }

        .delete-img {
            position: absolute;
            top: 10px;
            z-index: 999;
            right: 1px;
            top: -6px;
            cursor: pointer;

            width: 20px;
            height: 20px;

            color: var(--white);

            background-color: var(--dark-red);
            border-radius: 50%;
            padding: .5em;

            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
    }

    .confirm-delete {
        color: var(--pale-dark-red) !important;
        text-align: center;
        text-decoration: underline;
        cursor: pointer;
    }
`;

const FieldCanvas = styled.div`
    padding: 1em;

    border-radius: 1em;
    background-color: var(--grey-100);
`;

const UploadField = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	padding: 2em;

	border-radius: 1em;
	border: 1px solid var(--grey-900);
	border-style: dashed;

	color: var(--grey-400);
	text-align: center;

    cursor: pointer;
`;

export default EachDeskPage;