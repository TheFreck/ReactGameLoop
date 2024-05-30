import React, { useCallback, useEffect, useState } from "react";

export const LoopMechanism = ({ tickLength, checkIsRunning }) => {
    const [frameTime, setFrameTime] = useState(0);
    const [frameId, setFrameId] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let effectiveFrameId = 0;
        setIsRunning(checkIsRunning(effectiveFrameId));
        const frame = time => {
            if (checkIsRunning(effectiveFrameId)) {
                setFrameTime(time);
                effectiveFrameId = requestAnimationFrame(frame);
                console.log("effectiveFrameId: ", effectiveFrameId);
                setFrameId(effectiveFrameId);
            }
        };
        if (checkIsRunning(effectiveFrameId)) {
            requestAnimationFrame(frame);
        }
        else {
            console.log("not running");
            effectiveFrameId = 0;
        }
        return () => {
            for(var i=0; i<10; i++){
                cancelAnimationFrame(effectiveFrameId-i);
                console.log("cancelled frame: ", effectiveFrameId-i);
            }
            effectiveFrameId = 0;
        }
    }, []);

    const FrameCallback = useCallback(() =>
        <div>
            <div>Frame Id: {frameId}</div>
            <div>Frame Time: {frameTime}</div>
        </div>, [frameId]
    );

    return <FrameCallback />;
}

// useEffect(() => {
//     const frame = time => {
//         setFrameTime(time);
//         setFrameId(requestAnimationFrame(frame));
//     };
//     requestAnimationFrame(frame);
//     return () => cancelAnimationFrame(frameId);
// }, []);