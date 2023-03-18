import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Global Components
import { Container } from '../../../components/ui/Container';

// section

const SuccessPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
      setTimeout(() => {
        navigate("/management", { replace: true });
      }, 5000);
    },[])

    return(
        <Canvas>
            <Container>
                <Header>
                    <p>ลงทะเบียนสเปซเสร็จสิ้น</p>
                    <h1>ยินดีด้วย! คุณกำลังจะโฮสต์สเปซแห่งใหม่!</h1>
                </Header>
                <Detail>
                    <p><img src="/icons/icons8-loading-circle.gif" alt="spinner"/>กำลังจัดระเบียบให้กับพื้นที่ โปรดรอสักครู่...</p>
                </Detail>
            </Container>
        </Canvas>
    );
}

const Canvas = styled.div`
    height: 100vh;
    min-width: 300px;

    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3) 150%), url('https://images.unsplash.com/photo-1615852993296-b42d4dbb5555?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    h2{
        text-align: center;
        padding-bottom: 16px;
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
    
    p {
        color: var(--grey-900);
        background-color: var(--white);
        
        padding: .5em;
        
        display: flex;
        align-items: center;
        gap: 1em;

        @media screen and (min-width: 820px){
            font-size: 1.2em;
        }
    }
`;

export default SuccessPage;