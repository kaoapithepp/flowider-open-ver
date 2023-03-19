import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Global Components
import LoadingScreen from "../../components/loading/LoadingScreen";
import { NavBar } from "../../components/navbar/NavBar";

// UI
import { Container } from "../../components/ui/Container";

// Utils
import { isThereToken } from "../../utils/isThereToken";
import { dateReformat } from "../../utils/dateReformat";
import { BorderedButton } from "../../components/button/BorderedButton";
import EditProfile from "./components/EditProfile";
import { cacheImages } from "../../utils/cacheImages";

const SettingPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [profileInfo, setProfileInfo] = useState<any>({});

    const navigate = useNavigate();

    useEffect(() => {
        if(isThereToken) {
            try {
                axios.get(`${import.meta.env.VITE_FLOWY_API_ROUTE}/flowider`, {
                    headers: {
                        Authorization: `Bearer ${isThereToken}`
                    }
                })
                .then(res => {
                    setProfileInfo(res.data);
                    cacheImages([res.data.profile_imgUrl]);
                    setIsLoading(false);
                })
            } catch(err: any) {
                alert(err.message);
            }
        }
    },[]);

    async function handleSignOut(event: any) {
        event.preventDefault();

        try {
            localStorage.removeItem("flowyFlowider");

            navigate("/", { replace: true });
        } catch(err: any) {
            alert(err.message);
        }
    }
    
    return (
        <>
            {
                isLoading ? <LoadingScreen /> :
                <>
                    <NavBar />
                    <Container>
                        <Header>
                            <div className="space-between">
                                <img src={profileInfo.profile_imgUrl} alt=""/>
                                <p className="edit-info" onClick={e => setIsEditProfileOpen(true)}>แก้ไข</p>
                            </div>
                            <h1>สวัสดี, {profileInfo.first_name} {profileInfo.last_name}</h1>
                            <h4>เริ่มโฮสต์เมื่อ {dateReformat(profileInfo.createdAt).substr(6, 10)}</h4>
                        </Header>
                        <Section>
                            <div className="info-section">
                                <h3>อีเมล</h3>
                                <p>{profileInfo.email}</p>
                            </div>
                            <div className="info-section">
                                <h3>เบอร์โทรศัพท์</h3>
                                <p>{profileInfo.tel_no}</p>
                            </div>
                            <div className="info-section">
                                <h3>ข้อมูลธนาคาร</h3>
                                <p>{profileInfo.bnk_acc ? profileInfo.bnk_acc : "ไม่ระบุเลขที่บัญชี"}</p>
                                <p>{profileInfo.bnk_name ? profileInfo.bnk_name : "ไม่ระบุธนาคาร"}</p>
                            </div>
                        </Section>
                        <MarginBottom>
                            <BorderedButton onClick={handleSignOut}>ออกจากระบบ</BorderedButton>
                        </MarginBottom>
                    </Container>
                    {
                        isEditProfileOpen ?
                        <EditProfile
                            profileInfo={profileInfo}
                            editFunc={setProfileInfo} 
                            onCloseClick={(e: boolean) => setIsEditProfileOpen(e)}
                        /> :
                        null 
                    }
                </>
            }
        </>
    );
};

const Header = styled.div`
    display: flex;
    flex-direction: column;
    /* gap: 1em; */
    /* margin-top: 5em; */

    h1 {
        margin-top: .5em;
        line-height: 1.2em;
        font-size: 2em;
        font-weight: 600;
        color: var(--grey-900);
        width: 80%;
    }

    h4 {
        color: var(--grey-600);
        font-weight: 400;
    }

    img {
        width: 6em;
        height: 6em;
        border-radius: 50%;
        object-fit: cover;
    }

    .space-between {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .edit-info {
        color: var(--grey-600);
        text-decoration: underline;
        cursor: pointer;
    }
`;

const Section = styled.div`
    margin-top: 3em;
    
    .info-section {
        padding: 1em 0;
        border-bottom: 1px solid var(--grey-400);
        p {
            color: var(--grey-800);
        }
    }
`;

const MarginBottom = styled.div`
    margin-bottom: 3em;
`;

export default SettingPage;
