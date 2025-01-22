import { useCallback, useEffect, useRef, useState } from "react"
import LoopBody from "./LoopBody";
import { calculateFrame } from "../helpers/loopHelpers";

export const LoopMechanism = ({loopRef}) => {
    const [frame,setFrame] = useState(0);

    useEffect(() => {
        if(loopRef?.current?.loopId !== 0 && loopRef?.current?.loopFrame !== undefined){
            setFrame(loopRef.current.loopFrame);
            if(loopRef?.current?.isRunning){
                loopRef.current.intId = setInterval(march,500,cb => {
                    setFrame(cb.frame);
                    loopRef.current.loopFrame = cb.frame;
                    loopRef.current.data = cb.data;
                    loopRef.current.isComplete = cb.continue;
                    if(!cb.continue) clearInterval(loopRef?.current?.intId);
                })
            }
        }

        return () => clearInterval(loopRef?.current?.intId);
    },[]);

    const march = async (cb) => {
        if(loopRef && loopRef.current && loopRef.current.intId !== 0 && loopRef.current.isComplete){
            loopRef.current.isComplete = false;
            calculateFrame(loopRef.current.loopFrame,loop => {
                if(loopRef.current.isRunning) loop.continue = true;
                cb(loop);
            });
        }
    }

    const LoopBodyCallback = useCallback(() => <LoopBody frame={frame} />,[frame]);

    return <LoopBodyCallback />
}

export default LoopMechanism;