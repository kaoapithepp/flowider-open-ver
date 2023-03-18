import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Global Componets
import LoadingScreen from "../../../components/loading/LoadingScreen";
import { Container } from "../../../components/ui/Container";
import { BackButton } from "../../../components/button/BackButton";
import { Button } from "../../../components/button/Button";

// MUIs
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

// Utils
import { isThereToken } from "../../../utils/isThereToken";

const PlaceImgUploadPage = () => {
	const [isProcess, setIsProcess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearhParams] = useSearchParams();
    const targetPath = searchParams.get('target');

    useEffect(() => {
        images.length >= 3 ? setIsDisabled(false) : setIsDisabled(true)
    },[images]);

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

    function handleDeleteImage(index: any){
        const newImages = [...images];
        const newPreviews = [...previews];
        newImages.splice(index, 1);
        newPreviews.splice(index, 1);
        setImages(newImages);
        setPreviews(newPreviews);
    }

    async function handleSubmit(e: any){
        e.preventDefault();
        setIsLoading(true);
        if (images.length && isThereToken) {
            const formData = new FormData();
            images.forEach((image, index) => {
                formData.append(`image`, image);
            });            
            try {
                axios.post(`${import.meta.env.VITE_FLOWY_API_ROUTE}/place/place-img/f/${id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${isThereToken}`
                    }
                })
                .then(res => {
                    if(res.data.message){
                        navigate(targetPath ? `/place-geolocation/${id}?target=true` : `/edit-place/${id}`, { replace: false });
                    }
                }, (unres) => {
                    console.log(unres.response.data);
                })
            } catch(err: any) {
                alert(err.message);
            }
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
                        <h1>รูปภาพสำหรับสเปซของคุณ</h1>
                    </Header>
                    <Section>
                        <label htmlFor="upload-images">
                            <UploadField>
                                <AddPhotoAlternateRoundedIcon />
                                <p>ใส่รูปภาพอย่างน้อย 3 รูปเพื่อการแสดงผลที่สวยงาม</p>
                            </UploadField>
                        </label>
                        <input id="upload-images" type="file" accept="image/*" multiple={true} onChange={handleImageChange} />
                        <div className="img-showcase">
                            {
                                previews.length < 1 ? null :
                                previews.map((preview, index) => (
                                    <div className="img-box" key={index}>
                                    <div className="delete-img" onClick={() => handleDeleteImage(index)}>
                                        <RemoveCircleOutlineRoundedIcon />
                                    </div>
                                    <img src={preview} style={{ maxWidth: '100%' }} alt="Preview" />
                                </div>
                            ))}
                        </div>
                    </Section>
                    <Button onClick={handleSubmit} disabled={isDisabled}>
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
`

export default PlaceImgUploadPage