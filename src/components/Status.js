import React from 'react';
import styled from 'styled-components';

const Score = styled.div`
    text-align: center;
    border: 2px solid #fff;
    background: none;
    color: #fff;
    border-radius: 50px;
`

const Status = ({score}) =>{

    return(
    <Score>
        {`Score: ${score}`}
    </Score>)
}

export default Status;