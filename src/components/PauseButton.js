import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
    text-align: center;
    border: 2px solid #fff;
    background: none;
    color: #fff;
    border-radius: 50px;
    padding: 8px 20px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    margin-top: 20px;
    &:hover{
        color: #161616;
        background: #FFF;
        transition: all 0.2s ease-in-out;
    }
`

const PauseButton = ({isPause, onClick}) =>{

    return(
    <StyledButton onClick={onClick}>
        {isPause ? "Continue (space)" : "Pause (space)"}
    </StyledButton>)
}

export default PauseButton;