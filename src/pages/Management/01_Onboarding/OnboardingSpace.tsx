import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Global Components
import { Container } from '../../../components/ui/Container';

// section

const OnboardingSpace: React.FC = () => {
    const navigate = useNavigate();

    return(
        <Canvas>
            <Container>
                <Header>
                    <p>ขั้นตอนที่ 1 ใน 2 </p>
                    <h1>อธิบายเกี่ยวกับพื้นที่ของคุณ</h1>
                </Header>
                <Detail>
                    <p>เล่าเรื่องเกี่ยวกับพื้นที่ของคุณว่าเป็นรูปแบบใด ไม่ว่าจะเป็นบ้าน โรงแรม หรือคาเฟ่/ร้านกาแฟ และกรอกข้อมูลที่จำเป็นต่อการลงทะเบียน อ้อ! อย่าลืมเตรียมรูปภาพสวยๆ ของพื้นที่คุณ<u>อย่างน้อย 3 รูป</u>ด้วยนะ</p>
                </Detail>
            </Container>
            <Footer>
                <p onClick={() => navigate(-1)}>ยกเลิก</p>
                <p onClick={() => navigate("/onboard-desk", { replace: false })}>ขั้นตอนต่อไป (2/2)</p>
            </Footer>
        </Canvas>
    );
}

const Canvas = styled.div`
    height: 100vh;
    min-width: 300px;

    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3) 150%), url('https://images.unsplash.com/photo-1505275350441-83dcda8eeef5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    h2{
        text-align: center;
        padding-bottom: 16px;
    }

    span{
        font-weight: 300;
        margin-left: 8px;
    }

    .position-footer{
        position: fixed;
        width: 100%;
        left: 0;
        bottom: 0;
        margin: 0 auto;
    }
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    /* margin-top: 5em; */

    h1 {
        line-height: 1.2em;
        font-size: 4em;
        font-weight: 600;
        color: var(--white);
        width: 80%;
        box-shadow: var(--shadow);
    }

    p {
        color: var(--white);
    }
`;

const Detail = styled.div`
    margin-top: 2em;
    padding: 1em;

    border-radius: 1em;

    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(1em);
    
    p {
        color: var(--white);
        text-shadow: 1px 1px 10px var(--grey-900);
        
        @media screen and (min-width: 820px){
            font-size: 1.2em;
        }
    }
`;

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1em;

    position: absolute;
    bottom: 0;
    left: 50%;
    margin: 0 auto;
    transform: translate(-50%, 0);

    width: 100%;
    max-width: 800px;
    box-sizing: border-box;

    background-color: var(--black);
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;

    p {
        color: var(--white);
        text-decoration: underline;
        cursor: pointer;
    }
`;

export default OnboardingSpace;