import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import styled from 'styled-components';

// Global Components
import { Button } from '../../components/button/Button';
import { InputField } from '../../components/input/InputField';

// Components
import LoadingScreen from '../../components/loading/LoadingScreen';
import { isThereToken } from '../../utils/isThereToken';

interface UserLoginEntityContext {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [loginEntity, setLoginEntity] = useState<UserLoginEntityContext>({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const isThereToken = localStorage.getItem('flowyFlowider');
        if(isThereToken) {
            navigate('/dashboard', { replace: true });
        }
    },[]);

    async function handleLoginClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        try {
            setIsLoading(true);
            axios.post(`${import.meta.env.VITE_FLOWY_API_ROUTE}/flowider/login`, {
                email: loginEntity.email,
                password: loginEntity.password
            }, {
                headers : {
                    "Content-type" : "application/json"
                }
            })
            .then(({ data }) => {
                localStorage.setItem("flowyFlowider", JSON.stringify(data.token));
                window.location.reload();
                // if(isThereToken){
                //     setIsLoading(false);
                //     navigate("/dashboard", { replace: true });
                // }
            }, (unres) => {
                alert(unres.response.data);
            })

        } catch (err: any) {
            alert(err.message);
        }
    }

    return( 
        <>
            { isLoading ? <LoadingScreen customMessage="โปรดรอสักครู่" /> :
                <Container>
                    <div className='grid-display'>
                        <div className='img-size'>
                            <img  src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />
                        </div>
                        <div className='padding-content'>
                            <Header><h3>ยินดีต้อนรับสู่ Flowy สำหรับ Flowider</h3></Header>
                            <InputField 
                                type="email"
                                label="อีเมล"
                                callbackVal={(e: string) => setLoginEntity({...loginEntity, email: e})}    
                                placeholder="อีเมล"
                                required={true}
                                />
                            <InputField 
                                type="password"
                                label="รหัสผ่าน"
                                callbackVal={(e: string) => setLoginEntity({...loginEntity, password: e})}    
                                placeholder="รหัสผ่าน"
                                required={true}
                                />
                            <div className='margin'>
                                <Button onClick={handleLoginClick}>เข้าสู่ระบบ</Button>
                            </div>
                                <div className='collum-display'>
                                    <Link to="/register">สร้างบัญชีผู้ใช้</Link>
                                    <Link to="/forgot">ลืมรหัสผ่าน?</Link>
                                </div>
                            {/* <Or>หรือ</Or>
                            <Auth /> */}
                            <p>ท่านยอมรับ <span>ข้อกำหนดการใช้งาน</span> และ <span>นโยบายความเป็นส่วนตัว</span> ของ Flowy เมื่อดำเนินการต่อ</p>
                        </div>
                    </div>
                </Container>        
            }
        </>
    );
}

const Container = styled.div`
    padding: 16px;
    margin: 0 auto;
    max-width: 400px;
    min-width: 300px;
    border-radius: 16px;

    p{
        padding-top: 8px;
        font-size: 14px;
        text-align: center;
    }

    span{
        text-decoration: underline;
    }

    input{
        width: 100%;
        padding: 8px 8px ;
        display: inline-block;
        margin-bottom: 8px;
        border-radius: 8px;
        border: 1px solid var(--grey-300);
        box-sizing: border-box;
        font-family: var(--brand-font);
        font-size: 16px;
    }

    .collum-display{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .img-size{
            display: none;
    }

    .margin{
        margin-top: -8px;
    }

    @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait) {
        background-color: var(--white);
        box-shadow: var(--shadow);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);

        .padding-content{
            padding: 0px 16px;
        }
    }

    @media only screen and (min-width: 1024px) {
        max-width: 1024px;
        background-color: var(--white);
        box-shadow: var(--shadow);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);

        .grid-display{
            display: grid;
            grid-template-columns: 488px 488px;
            gap: 16px;
        }

        .img-size{
            display: flex;
            align-items: center;
            
            img{
                max-width: 488px;
                object-fit: cover;
                border-radius: 8px;
                height: 100%;
            }
        }

        .padding-content{
            padding: 0px 16px;
        }
    }
`;

const Header = styled.div`
    width: 100% ;
    padding: 8px 0px;
    border-bottom: 1px solid var(--grey-300);
    text-align: center;
    margin-bottom: 16px;
`;

const Or = styled.div`
    display: flex;
    align-items: center;
    
    ::before{
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background-color: var(--grey-300);
        margin-right: 16px;
    }
    ::after{
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background-color: var(--grey-300);
        margin-left: 16px;
    }
`;

export default LoginPage;