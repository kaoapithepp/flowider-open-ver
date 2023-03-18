import React, { useState }from "react";
import styled from "styled-components";

interface InputFieldPropsContext {
    callbackVal?: any;
    label?: string;
    placeholder?: string;
    type: string;
    maxChar?: number;
    required?: boolean;
    initVal?: any;
}

export const InputField: React.FC<InputFieldPropsContext> = ({ 
    callbackVal,
    placeholder,
    label,
    maxChar, 
    type,
    required,
    initVal
}) => {
    const [value, setValue] = useState(initVal ? initVal : '');

    function onFieldChange(e: any) {
        callbackVal(e.target.value);
        setValue(e.target.value);
    }

    function maxLengthCheck(e: any) {
        if(e.target.value.length > e.target.maxLength){
            e.target.value = e.target.value.slice(0, e.target.maxLength);
        }
    }

    return (
        <FormWrapper>
            <h4>{label}</h4>
            <InputBox
                type={type}
                value={value}
                onChange={e => onFieldChange(e)}
                placeholder={placeholder}
                maxLength={maxChar}
                onInput={maxChar? maxLengthCheck : undefined}
                required={required}
            />
        </FormWrapper>
    );
}

const FormWrapper = styled.div`
    
`;

const InputBox = styled.input`
    width: 100%;
    padding: .5em;
    margin-bottom: .5em;
    display: inline-block;
    border-radius: .5em;
    border: 1px solid var(--grey-300);
    box-sizing: border-box;
    font-family: var(--brand-font);
    font-size: 16px;
    outline: none;
    caret-color: var(--grey-800);
    color: var(--grey-800);

    :focus {
        border-color: var(--secondary);
    }
`