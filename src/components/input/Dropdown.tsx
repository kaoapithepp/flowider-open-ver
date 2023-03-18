import { useState } from "react";
import styled from "styled-components";

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface DropdownPropsContext {
    callbackVal?: any;
    label: string;
    placeholder: string;
    data: string[];
    initValue?: any;
}

export const Dropdown: React.FC<DropdownPropsContext> = ({
    callbackVal,
    label,
    placeholder,
    data,
    initValue
}) => {

    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState(initValue ? initValue : placeholder);

    function handleChildClick(element: any) {
        callbackVal(element);
        setValue(element);
    }

    const childList = data.map((element, key) => {
        return (
            <p key={key} onClick={e => handleChildClick(element)}>{element}</p>
        );
    });

    return (
        <>
            <FormWrapper
                focusing={isActive}
                onClick={(e: any) => setIsActive(!isActive)}
            >
                <p className="label">{label}</p>
                <div className="dropdown">
                    { isActive? 
                        <>
                            {value} <KeyboardArrowUpIcon />
                        </>
                        : 
                        <>
                            {value} <KeyboardArrowDownIcon />
                        </>
                    }
                </div>
                {isActive && 
                    <ChildList>
                        {childList}
                    </ChildList>
                }
            </FormWrapper>
        </>
        
    );
}


const FormWrapper = styled.div<any>`
    margin: 8px 0px;
    
    .label {
        /* margin: 4px 0px; */
        text-align: left !important;
        font-size: 1em !important;
    }
    
    .dropdown {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        position: relative;
        
        padding: .5em;
        background-color: var(--white);
        border: 1px solid var(--grey-300);
        border-radius: .5em;

        width: 100%;

        outline: none;
        cursor: pointer;

        color: var(--black);
        font-size: 1em;
        font-family: var(--brand-font);

        ::placeholder {
            color: var(--grey-300);
            font-weight: 400;
        }
        // :focus
        ${({ focusing }) => focusing && `
            border-color: var(--button-color);
        `}
    }
`;

const ChildList = styled.div`
    display: flex;
    flex-direction: column;
    
    position: absolute;
    z-index: 99;

    background-color: var(--white);
    border-radius: .5em;
    /* border: 1px solid var(--secondary); */
    box-shadow: 2px 2px 8px 4px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    
    padding: 1em;
    width: 30vw;
    height: 100px;
    max-height: 40%;
    
    overflow-y: scroll;

    @media screen and (max-width: 768px) {
        max-height: 20vh;
        width: 60%;
    }

    p {
        color: var(--black);
        padding: .5em;
        text-align: left !important;
    }
`;

export default Dropdown;