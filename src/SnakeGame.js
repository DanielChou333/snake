import React, {useState, useEffect, useCallback} from 'react';
import styled, {css} from "styled-components";
import Status from './components/Status';
import Map from './components/Map';
import VirtualKeyBoard from './components/VirtualKeyBoard';
import PauseButton from './components/PauseButton';
import { ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP, ENTER, GRID_SIZE, SNAKE_DELTA_SPEED, SNAKE_INITIAL_SPEED, SNAKE_SPEED_LIMIT, SPACE } from './constants';

const styleForDemo = css`
*{
    border: 1px solid white;
    padding: 4px;
    margin: 4px;
}
`;

const Background = styled.div`
    display: flex;
    justify-content: center;
    /*${styleForDemo}*/
    background-color: black;
`;

const Container = styled.div`
    margin-top: 40px;
`;

const Container2 = styled.div`
    
`;

const defaultSnake = {
    head: {x: 2, y:0},
    body: [
        {x:1, y:0},
        {x:0, y:0}
    ],
    maxLength: 3,
    direction: ARROW_RIGHT,
    turnDir: ARROW_RIGHT,
    speed: SNAKE_INITIAL_SPEED
};

const directionMap = {
    [ARROW_UP]: {x:0, y:-1},
    [ARROW_DOWN]: {x:0, y:1},
    [ARROW_LEFT]: {x:-1, y:0},
    [ARROW_RIGHT]: {x:1, y:0}
}

//this KeyMap helps add wasd to movement, and also patches missing layer between directionKey and constants
//probably better to use keyboard api
const keyMap = {
    "KeyW": ARROW_UP,
    "KeyS": ARROW_DOWN,
    "KeyA": ARROW_LEFT,
    "KeyD": ARROW_RIGHT,

    "ArrowUp": ARROW_UP,
    "ArrowDown": ARROW_DOWN,
    "ArrowLeft": ARROW_LEFT,
    "ArrowRight": ARROW_RIGHT
}

const createFood = () => {
    const newFood = {   
        x: Math.floor(Math.random()*GRID_SIZE),
        y: Math.floor(Math.random()*GRID_SIZE)
    }
    return(newFood)
}

const formatPosition = (position) => {
    if (position > GRID_SIZE-1){return 0}
    if (position < 0){return GRID_SIZE-1}
    return position 
}

const SnakeGame = () => {
    const [snake, setSnake] = useState(defaultSnake)
    const [food, setFood] = useState(()=>createFood())
    const [isStart, setStart] = useState(false)
    const [isPause, setPause] = useState(false)
    const [score, setScore] = useState(0)

    //TODO 
    //theres a bug where you can turn 180 if you turn 90 twice, really fast
    //possible solution: 
    //1. update direction only on tick
    //2. add a turnDir to snake, where that can change alot of times but snake onnly updates in the final tick  
    // solution 2 works
    const handleChangeDirection = (directionKey) => {
        if(isPause||!isStart){return;}
        
        /* not sure why this cant work
        switch (keyMap[directionKey]){
            case (undefined): break;
            case (ARROW_DOWN): break;
            case (ARROW_UP): break;
            case (ARROW_LEFT): break;
            case (ARROW_RIGHT): break;
            default:
                setSnake(prevSnake => ({...prevSnake, 
                    turnDir: keyMap[directionKey]
                }))
        }*/
        
        if(keyMap[directionKey] !== undefined){
            if(snake.direction === ARROW_UP && keyMap[directionKey]===ARROW_DOWN){}
            else if(snake.direction === ARROW_DOWN && keyMap[directionKey]===ARROW_UP){}
            else if(snake.direction === ARROW_LEFT && keyMap[directionKey]===ARROW_RIGHT){}
            else if(snake.direction === ARROW_RIGHT && keyMap[directionKey]===ARROW_LEFT){}
            else{
                setSnake(prevSnake => ({...prevSnake, 
                    turnDir: keyMap[directionKey]
                }))
            }  
        }
    } 

    //TODO
    const handleOnGameStart = () => {
        setSnake(defaultSnake);
        setScore(0);
        setStart(true);
    } 

    //TODO
    const handleTogglePause = () => {
        if(isStart){
            setPause( (prev) => !prev)
        }
    } 

    //TODO
    const handleKeyDown = useCallback((e) => {
        const {code} = e
        if(code === SPACE){
            if(!isStart || isGameOver){return}
            handleTogglePause(); //this setState does not update before handleChangeDirection
            return;
        }else if(code === ENTER){
            if(!isStart || isGameOver){handleOnGameStart();}
        }
        handleChangeDirection(code)
    },[snake]) 
    
    const isGameOver = snake.body.find( bodyPart => 
        bodyPart.x === snake.head.x
        && bodyPart.y === snake.head.y,
    )
    const isEatFood = snake.head.x ===food.x && snake.head.y === food.y

    //Man this is ugly asf
    useEffect(()=>{
        if(!isStart || isPause){return}
        const gameIntervalId = setInterval( ()=>{
            setSnake( prevSnake => {
                const newX = formatPosition(prevSnake.head.x + directionMap[prevSnake.turnDir].x)
                const newY = formatPosition(prevSnake.head.y + directionMap[prevSnake.turnDir].y)
                
                const newHead = {x: newX, y:newY}
                const newBody = [prevSnake.head, ...prevSnake.body.slice(0, prevSnake.maxLength - 2)]
                return({
                    ...prevSnake,
                    head: newHead,
                    body: newBody,
                    direction: prevSnake.turnDir
                })
            })
        }, snake.speed);
        return () => {clearInterval(gameIntervalId)};
    }, [snake.speed, isStart, isPause]);
    
    //TODO
    useEffect(()=>{
        if(isEatFood){
            setFood(createFood())
            setScore( preScore => preScore+1)

            setSnake( preSnake => {
                const updatedSpeed = preSnake.speed - SNAKE_DELTA_SPEED
                return ({
                    ...preSnake,
                    maxLength: preSnake.maxLength +1,
                    speed: Math.max(SNAKE_SPEED_LIMIT, updatedSpeed)
                })
            })
        }
    },[isEatFood]);   

    //TODO
    useEffect(()=>{
        window.addEventListener("keydown", handleKeyDown)
        return () => {window.removeEventListener("keydown", handleKeyDown)}
    },[handleKeyDown]);

    //TODO
    useEffect(()=>{
        if(isGameOver){setStart(false)}
    },[isGameOver])

    return (
    <Background>
        <Container>
            <Status score={score} />
            
            <Map snake={snake} 
                food={food} 
                isStart={isStart} 
                isGameOver={isGameOver} 
                handleStart={handleOnGameStart}/>

            <Container2>
                <VirtualKeyBoard></VirtualKeyBoard>
                <PauseButton onClick={handleTogglePause} isPause={isPause}></PauseButton>
            </Container2>
        </Container>
    </Background>
    )
}


export default SnakeGame;