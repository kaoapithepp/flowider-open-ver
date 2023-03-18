import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Global Components
import { Button } from '../../components/button/Button';
import { BorderedButton } from '../../components/button/BorderedButton';
import { InputField } from '../../components/input/InputField';
import Dropdown from '../../components/input/Dropdown';

// data
import { BANKS_NAME } from '../../data/BanksName';

const RegisterPage: React.FC = () => {
    const [registerEntity, setRegisterEntity] = useState<any>({
        first_name: '',
        last_name: '',
        email: '',
        tel_no: '',
        bnk_name: '',
        bnk_acc: '',
        password: '',
        confirm_pw: '',
    });

    const navigate = useNavigate();

    // Reg-ex to validate the form an email
    async function isValidEmail(email: string) {
        return /\S+@\S+\.\S+/.test(email);
    }

    // Check email after clicked register whether valid or not
    async function handleCheckEmailThenNavigate() {
        // If not valid, then return nothing
        if(!isValidEmail(registerEntity.email)){
            alert("Email is invalid format!");
            return;
        }
        
        if (registerEntity.password !== registerEntity.confirm_pw) {
            alert("Password and confirm password is not matched!");
            return;
        }

        try {
            axios.post(`${import.meta.env.VITE_FLOWY_API_ROUTE}/flowider`, {
                first_name: registerEntity.first_name,
                last_name: registerEntity.last_name,
                email: registerEntity.email,
                tel_no: registerEntity.tel_no,
                password: registerEntity.password,
                bnk_name: registerEntity.bnk_name,
                bnk_acc: registerEntity.bnk_acc
            })
            .then(res => {
                alert("Sign up successful!");
                navigate("/", { replace: false });
            }, (unres) => {
                alert(unres.response.data);
            })
            .catch(err => {
                alert(err.message);
            });

        } catch(err: any) {
            alert(err.message);
        }
        
    }

    async function registerClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        await handleCheckEmailThenNavigate();
    }

    function loginClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        navigate("/", { replace: false });
    }

    return( 
        <Container>
            <Section>                
            <div className='grid-display'>
                <div className='padding-content'>
                    <Header><h3>สมัครสมาชิก สำหรับโฮสต์</h3></Header>
                    <div className='column-display'>
                        <div>
                            <InputField 
                                type="text"
                                placeholder="ชื่อ"
                                callbackVal={(e: string) => setRegisterEntity({...registerEntity, first_name: e})}
                                label="ชื่อ"
                                required={true}
                            />
                        </div>
                        <div>
                            <InputField 
                                type="text"
                                placeholder="นามสกุล"
                                callbackVal={(e: string) => setRegisterEntity({...registerEntity, last_name: e})}
                                label="นามสกุล"
                                required={true}
                            />
                        </div>
                    </div>        
                    <InputField 
                        type="email"
                        placeholder="อีเมล"
                        callbackVal={(e: string) => setRegisterEntity({...registerEntity, email: e})}
                        label="อีเมล"
                        required={true}
                    />
                    <InputField 
                        type="text"
                        placeholder="เบอร์มือถือ"
                        callbackVal={(e: string) => setRegisterEntity({...registerEntity, tel_no: e})}
                        label="เบอร์มือถือ"
                        required={true}
                    />
                    <div className='column-display'>
                        <div>
                            <Dropdown 
                                label="โปรดระบุธนาคารของบัญชี"
                                placeholder="โปรดระบุธนาคาร"
                                data={BANKS_NAME}
                                callbackVal={(e: string) => setRegisterEntity({...registerEntity, bnk_name: e})}
                            />
                        </div>
                        <div>
                        <InputField 
                            type="text"
                            placeholder="หมายเลขบัญชีธนาคาร"
                            callbackVal={(e: string) => setRegisterEntity({...registerEntity, bnk_acc: e})}
                            label="หมายเลขบัญชีธนาคาร"
                            required={true}
                        />
                        </div>
                    </div>
                    <div className='margin'>
                        <div className='column-display'>
                            <InputField 
                                type="password"
                                placeholder="รหัสผ่าน"
                                callbackVal={(e: string) => setRegisterEntity({...registerEntity, password: e})}
                                label="รหัสผ่าน"
                                required={true}
                            />
                            <InputField 
                                type="password"
                                placeholder="ยืนยันรหัสผ่าน"
                                callbackVal={(e: string) => setRegisterEntity({...registerEntity, confirm_pw: e})}
                                label="ยืนยันรหัสผ่าน"
                                required={true}
                            />
                        </div>
                    </div>
                    <Button onClick={registerClick}>สมัครสมาชิก</Button>
                    {/* <Or>หรือ</Or>
                    <Auth /> */}
                    <BorderedButton onClick={loginClick}>มีบัญชีอยู่แล้ว? เข้าสู่ระบบ</BorderedButton>
                    <p>ท่านยอมรับ <span>ข้อกำหนดการใช้งาน</span> และ <span>นโยบายความเป็นส่วนตัว</span> ของ Flowy เมื่อดำเนินการต่อ</p>
                </div>
                <div className='img-size'>
                    <img  src="https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />
                </div>
            </div>
            </Section>
        </Container>        
    );
}

const Container = styled.div`
    padding: 16px;
    margin: 0 auto;
    border-radius: 16px;

    p{
        font-size: 14px;
        text-align: center;
        margin-top: -8px;
    }

    label{
        font-weight: 500;
    }

    span{
        text-decoration: underline;
    }

    input, select{
        width: 100%;
        padding: 8px 8px ;
        margin-bottom: 8px;
        display: inline-block;
        border-radius: 8px;
        border: 1px solid var(--grey-300);
        box-sizing: border-box;
        font-family: var(--brand-font);
        font-size: 16px;
        color: var(--black);
    }

    .img-size{
            display: none;
    }

    .margin{
        margin-bottom: -8px;
    }

    @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait) {
        min-width: 400px;
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

    @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape) {
        min-width: 400px;
        max-width: 1024px;
        background-color: var(--white);
        box-shadow: var(--shadow);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);

        .column-display{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }

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

    @media only screen and (min-width: 1024px) {
        min-width: 400px;
        max-width: 1024px;
        background-color: var(--white);
        box-shadow: var(--shadow);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);

        .column-display{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }

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

const Section = styled.div`
    background-color: var(--white);
    height: 100%;
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
    margin: -8px 0px;
    
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

export default RegisterPage;