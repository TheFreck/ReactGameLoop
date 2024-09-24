import React, { Suspense, useCallback, useState,useEffect } from 'react';
import LoopContext from '../contexts/LoopContext';
import Loop from './Loop';
import { LoopMechanism } from './LoopMechanism';

export const LoopContainer = () => {
    const [tickLength, setTickLength] = useState(10);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        console.log(`******* turning ${isRunning ? "ON" : "OFF"} *******`);
    },[isRunning])

    const checkIsRunning = async (frameId) => {
        console.log("isRunning: ", isRunning);
        console.log("isRunning frame: ", frameId);
        return isRunning;
    }

    const LoopMechanismCallback = useCallback(() => 
        <LoopMechanism tickLength={tickLength} isRunning={isRunning} checkIsRunning={checkIsRunning} />,
    [isRunning,tickLength]);
    
    return <>
        <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? "STOP" : "START"}</button>
        <LoopMechanismCallback />
    </>
}

export default LoopContainer;