import React from 'react';
import styled from 'styled-components';
import { ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP } from '../constants';
import ArrowButton from './ArrowButton'

const GridContainer = styled.div`
    display: inline-grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 4px;
`

const VirtualKeyBoard = ({handleChangeDirection}) =>{

    return(
    <GridContainer>
        <ArrowButton direction={ARROW_UP} onClick={()=>handleChangeDirection(ARROW_UP)}/>
        <ArrowButton direction={ARROW_LEFT} onClick={()=>handleChangeDirection(ARROW_LEFT)}/>
        <ArrowButton direction={ARROW_DOWN} onClick={()=>handleChangeDirection(ARROW_DOWN)}/>
        <ArrowButton direction={ARROW_RIGHT} onClick={()=>handleChangeDirection(ARROW_RIGHT)}/>
    </GridContainer>
    )
}

export default VirtualKeyBoard;