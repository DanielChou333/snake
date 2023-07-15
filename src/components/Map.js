import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ENTER, GRID_SIZE, MAX_CONTENT_WIDTH, PAGE_PADDING } from '../constants';

const mapSize = css`
    width: min(
        calc(100vw - ${PAGE_PADDING * 2}px),
        ${MAX_CONTENT_WIDTH - PAGE_PADDING * 2}px
    );
    height: min(
        calc(100vw - ${PAGE_PADDING * 2}px),
        ${MAX_CONTENT_WIDTH - PAGE_PADDING * 2}px
    );
`

const Container = styled.div`
    position: relative;
`
const GridContainer = styled.div`
    ${mapSize}
    display: grid;
    grid-template-columns: repeat(${GRID_SIZE}, 1fr);
    grid-template-rows: repeat(${GRID_SIZE}, 1fr);
    grid-gap: 2px;
`
const Square = styled.div`
    background-color: ${props=> props.$isSnake ? "#FFF" : "#161616"};
`

const ripple = keyframes`
    0%{
        box-shadow: 0 0 0 0 red;
    }
    70%{
        box-shadow: 0 0 0 20px rgba(204, 169, 44, 0);
    }
    100%{
        box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
    }
`

const Food = styled.div`
    border-radius: 100%;
    width: 100%;
    height: 100%;
    background: red;    
    animation: ${ripple} 2s infinite;
    position: relative;
`

const Mask = styled.div`
    ${mapSize}
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const GameOver = styled.div`
    margin-bottom: 20px;
    font-weight: 900;
    font-size:24px;
    color: white;
`

const StartButton = styled.div`
    text-align: center;
    border: 2px solid #fff;
    background: none;
    color: #fff;
    border-radius: 50px;
    padding: 8px 20px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        color: #161616;
        background: grey;
        transition: all 0.2s ease-in-out;
    }
`

const squares = Array(GRID_SIZE).fill(0).map((_,index)=> index)

const Map = ({snake, food, isStart, isGameOver, handleStart}) =>{
    const {head, body} = snake

    return(
    <Container>
        <GridContainer>
            {squares.map( row => 
                squares.map( col => {
                    const isSnake = [head, ...body].find((item)=> item.x===col && item.y ===row)
                    const isFood = col === food.x && row === food.y
                    
                    return(
                    <Square key={`${row}_${col}`} data-x={row} data-y={col} $isSnake={isSnake} $isFood={isFood}>
                        {isFood && <Food/>}
                    </Square>)
                })
            )}
        </GridContainer>
        {!isStart && (
            <Mask>
                {isGameOver && <GameOver>Game Over</GameOver>}
                <StartButton onClick={handleStart}>
                    {isGameOver ? 'Restart ('+ENTER+')':'Start ('+ENTER+')'}
                </StartButton>
            </Mask>
        )}
    </Container>)
}

export default Map;