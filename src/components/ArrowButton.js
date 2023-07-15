import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`

`

const ArrowButton = ({isPause, onClick}) =>{

    return(
    <div onClick={onClick}>
        {isPause ? "Continue (space)" : "Pause (space)"}
    </div>)
}

export default ArrowButton;