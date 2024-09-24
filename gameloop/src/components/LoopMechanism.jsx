import React, { useCallback, useEffect, useState } from "react";
import LoopHelpers from "../logic/loopHelpers";

export const LoopMechanism = ({ tickLength, isRunning, checkIsRunning }) => {
    const [frameTime, setFrameTime] = useState(0);
    const [frameId, setFrameId] = useState(0);

    useEffect(() => {
        let stopped = !isRunning;
        let effectiveFrameId = 0;
        var updateTick = 0;
        const frame = async time => {
            checkIsRunning(updateTick).then((running) => {
                if (running && !stopped) {
                    setFrameTime(time);
                    if (++effectiveFrameId % tickLength === 0) {
                        LoopHelpers.updateMethod(updateTick).then((tick) => {
                            checkIsRunning(updateTick).then(stillRunning => {
                                if (stillRunning && !stopped) {
                                    updateTick = tick;
                                }
                                else {
                                    cancelAnimation(effectiveFrameId);
                                    stopped = true;
                                }
                            })
                        });
                    }
                    setFrameId(requestAnimationFrame(frame));
                }
                else {
                    cancelAnimation(effectiveFrameId);
                    stopped = true;
                    effectiveFrameId = 0;
                }
            })
        };
        checkIsRunning(updateTick).then(running => {
            if (running && !stopped) {
                requestAnimationFrame(frame);
            }
            else {
                effectiveFrameId = 0;
            }
        })
        return () => {
            cancelAnimation(effectiveFrameId);
            stopped = true;
            effectiveFrameId = 0;
        }
    }, []);

    const cancelAnimation = (frame) => {
        for (var i = -100; i < 100; i++) {
            cancelAnimationFrame(frame - i);
            console.log("cancelling frame: ", frame - i);
        }
        return;
    }

    const FrameCallback = useCallback(() =>
        <div>
            <div>Frame Id: {frameId}</div>
            <div>Frame Time: {frameTime}</div>
        </div>, [frameId]
    );

    return <FrameCallback />;
}