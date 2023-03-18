import React, { useState } from "react";
import styled from "styled-components";

// MUIs
import PowerIcon from '@mui/icons-material/Power';
import WifiIcon from '@mui/icons-material/Wifi';
import WcIcon from '@mui/icons-material/Wc';
import TvIcon from '@mui/icons-material/Tv';
import UsbIcon from '@mui/icons-material/Usb';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import HvacIcon from '@mui/icons-material/Hvac';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import VideocamIcon from '@mui/icons-material/Videocam';

interface AmenityCardPropsContext {
    headline?: string;
    initVal?: any;
    callbackVal?: any;
    icon?: any;
}

export const AmenityCard: React.FC<AmenityCardPropsContext> = ({
    headline,
    initVal,
    callbackVal,
    icon
}) => {
    const [isSelected, setIsSelected] = useState(initVal);

    function handleChangeSelection(){
        setIsSelected(!isSelected);
        callbackVal(!isSelected);
    }

    function renderIconFromAttrib(action: string){
        switch(action){
            case 'hasPowerSupply':
                return <PowerIcon />;
            case 'hasWifi':
                return <WifiIcon />;
            case 'hasRestroom':
                return <WcIcon />;
            case 'hasProjector':
                return <TvIcon />;
            case 'hasHDMI':
                return <UsbIcon />;
            case 'hasFlowiderCare':
                return <SentimentSatisfiedAltIcon />;
            case 'hasAirCondition':
                return <HvacIcon />;
            case 'hasNapZone':
                return <BedtimeIcon />;
            case 'hasSnackAndBeverage':
                return <RestaurantIcon />;
            case 'hasCCTVorSecurity':
                return <VideocamIcon />;
            default:
                break;
        }
    }

    return (
        <AmenityWrapper
            isSelected={isSelected}
            onClick={handleChangeSelection}
        >
            {renderIconFromAttrib(icon)}
            <h3>{headline}</h3>
        </AmenityWrapper>
    );
}

const AmenityWrapper = styled.div<any>`
    padding: 1em;

    background-color: ${props => props.isSelected ? `var(--grey-100)`: `var(--white)`};
    /* background-color: var(--white); */
    border-radius: 1em;
    border:  ${props => props.isSelected ? `1px solid var(--grey-900)`: `1px solid var(--grey-200)`};
    box-shadow: ${props => props.isSelected ? `var(--shadow)`: null};

    cursor: pointer;

    h3 {
        font-size: 1em;
    }

    svg {
        transform: scale(1.2);
    }
`;