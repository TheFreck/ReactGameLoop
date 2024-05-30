import React, { Suspense, useCallback, useState,useEffect } from 'react';
import LoopContext from '../contexts/LoopContext';
import Loop from './Loop';
import { LoopMechanism } from './LoopMechanism';

export const LoopContainer = () => {
    const [tickLength, setTickLength] = useState(1000);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        console.log(`turning ${isRunning ? "ON" : "OFF"}`);
    },[isRunning])

    const checkIsRunning = (frameId) => {
        console.log("IS RUNNING FRAME ID: ", frameId);
        console.log("IS RUNNING: ", isRunning);
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