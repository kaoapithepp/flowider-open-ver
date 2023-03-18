import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Global Components
import { Button } from "../../../components/button/Button";
import { InputField } from "../../../components/input/InputField";
import Dropdown from "../../../components/input/Dropdown";

// MUIs
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// Utils
import { isThereToken } from "../../../utils/isThereToken";

// Data
import { BANKS_NAME } from "../../../data/BanksName";

interface EditProfilePropsContext {
    profileInfo: any;
    editFunc: any;
    onCloseClick: any;
}

const EditProfile: React.FC<EditProfilePropsContext> = ({ profileInfo, editFunc, onCloseClick }) => {
    const [isProcess, setIsProcess] = useState(false);

    const navigate = useNavigate();

    function handleCloseSection(event: any) {
        event.preventDefault();

        onCloseClick(false);
    }

    async function handleEditInfo(event: any){
        event.preventDefault();
        setIsProcess(true);

        try {
            if(isThereToken){
                axios.put(`${import.meta.env.VITE_FLOWY_API_ROUTE}/flowider`, profileInfo, {
                    headers: {
                        Authorization: `Bearer ${isThereToken}`
                    }
                })
                .then(res => {
                    window.location.reload();
                    setIsProcess(false);
                }, (unres) => {
                    alert(unres.response.data);
                })
            }
        } catch(err: any) {
            alert(err.message);
        }
    }
    
    return (
        <Container>
            <Wrapper>
                <div className="close-window"><CloseRoundedIcon onClick={handleCloseSection} /></div>
                <div className="edit-section">
                    <InputField 
                        type="text"
                        label="ชื่อจริง"
                        placeholder="ชื่อจริง"
                        initVal={profileInfo.first_name}
                        callbackVal={(e: string) => editFunc({...profileInfo, first_name: e})}
                    />
                    <InputField 
                        type="text"
                        label="นามสกุล"
                        placeholder="นามสกุล"
                        initVal={profileInfo.last_name}
                        callbackVal={(e: string) => editFunc({...profileInfo, last_name: e})}
                    />
                    <InputField 
                        type="email"
                        label="อีเมล"
                        placeholder="อีเมล"
                        initVal={profileInfo.email}
                        callbackVal={(e: string) => editFunc({...profileInfo, email: e})}
                    />
                    <InputField 
                        type="text"
                        label="เบอร์โทรศัพท์"
                        placeholder="เบอร์โทรศัพท์"
                        initVal={profileInfo.tel_no}
                        callbackVal={(e: string) => editFunc({...profileInfo, tel_no: e})}
                    />
                    <InputField 
                        type="text"
                        label="เลขที่บัญชี"
                        placeholder="เลขที่บัญชี"
                        initVal={profileInfo.bnk_acc}
                        callbackVal={(e: string) => editFunc({...profileInfo, bnk_acc: e})}
                    />
                    <Dropdown
                        label="ชื่อธนาคาร"
                        placeholder="ชื่อธนาคาร"
                        data={BANKS_NAME}
                        callbackVal={(e: string) => editFunc({...profileInfo, bnk_name: e})}
                    />
                    <Button onClick={handleEditInfo} disabled={isProcess}>
                        {
                            isProcess ? "กำลังอัพเดทข้อมูล..." : "ยืนยันการแก้ไขข้อมูล"
                        }
                    </Button>
                </div>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
    background-color: rgba(10, 10, 10, 0.6);
    height: 100vh;
    width: 100%;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;

    box-sizing: border-box;
`;

const Wrapper = styled.div`
    padding: 1em;
    margin: 0 auto;
    
    width: 80%;
    max-width: 800px;
    height: auto;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 1em;
    background-color: var(--white);
    box-sizing: content-box;

    .close-window {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .edit-section {
        display: flex;
        flex-direction: column;
    }
`;

export default EditProfile;