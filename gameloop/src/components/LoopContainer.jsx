import react, { useCallback, useContext, useEffect, useState } from "react";
import LoopContext from "../contexts/LoopContext";
import LoopMechanism from "./LoopMechanism";

export const LoopContainer = ({appId}) => {
    const [isRunning,setIsRunning] = useState(false);
    const [containerId, setContainerId] = useState(0);
    const [globals,setGlobals] = useState({loopFrame: 0});

    useEffect(() => {
        if(appId !== 0)
            setContainerId(appId);
        return () => setContainerId(0);
    },[]);

    const LoopMechanismCallback = useCallback(() => {
        return <LoopMechanism isRunning={isRunning} containerId={containerId} />
    },[isRunning,containerId]);

    return <div>
        <LoopContext.Provider
            value={{globals,setGlobals}}
        >
            <h1>
                Loop Container
            </h1>
            <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? "Stop" : "Start"}</button>
            <button onClick={() => {
                setGlobals({
                    loopFrame: 0
                });
                setTimeout(setIsRunning(!isRunning);
            }}
            >
                Reset
            </button>
            <LoopMechanismCallback />
        </LoopContext.Provider>
        </div>
}

export default LoopContainer;