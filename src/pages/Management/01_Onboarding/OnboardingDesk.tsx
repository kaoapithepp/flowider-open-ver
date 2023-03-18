import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Global Components
import { Container } from '../../../components/ui/Container';

const OnboardingDesk: React.FC = () => {
    const navigate = useNavigate();
    return(
        <Canvas>
            <Container>
                <Header>
                    <p>ขั้นตอนที่ 2 ใน 2 </p>
                    <h1>เตรียมให้พร้อมสำหรับโต๊ะแรก</h1>
                </Header>
                <Detail>
                    <p>{`
                    ระบุรายละเอียดที่นั่งให้ผู้เช่าเข้าใจได้ชัดเจน
                    แนะนำว่าให้จัดสรรโซนพื้นที่แล้วเราจะเรียกโซนเหล่านั้นว่า "โต๊ะ" พร้อมระบุประเภทที่นั่ง, จำนวนน้อยที่สุด-มากที่สุดที่จะจองได้ และแน่นอนว่าต้องใส่รูปสวยๆ ด้วยนะ!`}</p>
                </Detail>
            </Container>
            <Footer>
                <p onClick={() => navigate(-1)}>ก่อนหน้า</p>
                <p className="call-to-act" onClick={() => navigate("/place-category", { replace: false })}>เริ่มกันเลย!</p>
            </Footer>
        </Canvas>
    );
}

const Canvas = styled.div`
    height: 100vh;
    min-width: 300px;

    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2) 150%), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
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

    .call-to-act {
        padding: .5em .7em;

        border-radius: 1em;
        
        background-color: var(--white);
        color: var(--grey-900);

        text-decoration: none;
    }
`;

export default OnboardingDesk;