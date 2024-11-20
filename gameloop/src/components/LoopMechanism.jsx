import react, { useCallback, useContext, useEffect, useRef, useState } from "react";
import LoopContext from "../contexts/LoopContext";
import loopHelpers from "../logic/loopHelpers";
import LoopBody from "./LoopBody";

export const LoopMechanism = ({ isRunning, containerId }) => {
    const { globals,setGlobals } = useContext(LoopContext);
    const [frame,setFrame] = useState(globals.loopFrame);
    const loopRef = useRef();

    useEffect(() => {
        if(loopRef === undefined) return;
        loopRef.current = {
            loopId: containerId,
            loopFrame: globals.loopFrame,
            loopComplete: true,
            intId: 0
        };
        if (loopRef.current.loopId !== 0) {
            if (isRunning) {
                loopRef.current.intId = setInterval(march, 1000, fr => {
                    setComplete(true, comp => {
                        setGlobals({
                            loopFrame: loopRef.current.loopFrame,
                        })
                    });
                });
            }
            else {
                clearInterval(loopRef.current.intId);
            }
        }
        return () => {
            clearInterval(loopRef?.current?.intId);
        }
    }, []);

    const updateFrame = async (val,cb) => {
        loopRef.current.loopFrame = val;
        setFrame(val);
        await cb(loopRef.current.loopFrame);
    }

    const setComplete = (val,cb) => {
        loopRef.current.loopComplete = val;
        cb(loopRef.current.loopComplete);
    }

    const march = async (cb) => {
        if (loopRef && loopRef.current && loopRef.current.loopComplete !== undefined) {
            await setComplete(false, val => {
                loopHelpers.calculateFrame(loopRef.current.loopFrame, num => {
                    updateFrame(num,fr => {
                        cb(fr);
                    });
                })
            });
        }
        else {
            // wait 
        }
    }



    return <div
        ref={loopRef}
    >
        <div>
            tick: {frame}
        </div>
        <LoopBody />
    </div>
}

export default LoopMechanism;