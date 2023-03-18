import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// MUIs
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import AddHomeRoundedIcon from '@mui/icons-material/AddHomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

export const NavBar: React.FC = () => {
    const navigate = useNavigate();

    function handleToDashboard(targetPath: string) {
        navigate(targetPath, { replace: false });
    }
    
    return (
        <NavContainer>
            <CalendarTodayRoundedIcon onClick={() => handleToDashboard("/dashboard")} />
            <AddHomeRoundedIcon onClick={() => handleToDashboard("/management")}/>
            <SettingsRoundedIcon onClick={() => handleToDashboard("/settings")}/>
        </NavContainer>
    );
}

const NavContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    /* transform: translate(-50%, 0); */
    z-index: 999;
    
    padding: 1em;
    width: 100%;
    max-width: 800px;
    box-sizing: border-box;

    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 2em;
    
    box-shadow: var(--shadow);
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
    background-color: var(--white);

    color: var(--grey-600);

    > * {
        cursor: pointer;
    }
`;