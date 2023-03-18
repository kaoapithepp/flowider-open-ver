import React from "react";
import styled from "styled-components";

interface LoadingScreenContext{
    customMessage?: string;
}

const LoadingScreen: React.FC<LoadingScreenContext> = ({ customMessage }) => {
    return (
        <Wrapper
            // className={`${!stillLoad ? 'alert-show' : 'alert-hidden'}`}
            // onTransitionEnd={() => transitionEnd(false)}
        >
            <p>{customMessage ? `${customMessage}...`: "เรากำลังเตรียมสถานที่อันน่าสนใจ..."} <img src="/icons/icons8-sent.gif" /></p>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    height: 100vh;
    background-color: var(--white);
    z-index: 99;
    
    p {
        font-size: 16px;
        color: var(--grey-800);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: max-content;
    }

    img {
        height: 16px;
    }

    .alert-show {

    }

    .alert-hidden {
        /* transition-delay: 3s; */
        /* transition-duration: 5s; */
        animation: fadeout 5s linear 3s;

        @keyframes fadeout {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    }
`

export default LoadingScreen;