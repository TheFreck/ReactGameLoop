import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import LoopMechanism from "./LoopMechanism";
import { Box, Button, Typography } from "@mui/material";

export const LoopContainer = ({appId}) => {
    const [containerId,setContainerId] = useState(0);
    const [ready,setReady] = useState(false);
    const loopRef = useRef();

    useEffect(() => {
        if(appId !== 0){
            setContainerId(appId);
            init()
        }
        return () => {
            setContainerId(0);
            init();
        }
    },[]);

    const startStop = () => {
        loopRef.current.isRunning = !loopRef.current.isRunning;
        setReady(!ready);
    }

    const init = () => {
        loopRef.current = {
            loopId: appId,
            loopFrame: 0,
            intId: 0,
            isRunning: false,
            isComplete: true,
            data: {}
        }
        setReady(!ready);
    }

    const LoopMechanismCallback = useCallback(() => <LoopMechanism containerId={containerId} loopRef={loopRef} init={init} />, [ready,containerId]);

    return <Box>
        <Typography>
            Loop Container
        </Typography>
        <Button
            onClick={startStop}
        >
            {loopRef?.current?.isRunning ? "Stop" : "Start"}
        </Button>
        <Button
            onClick={init}
        >
            Reset
        </Button>
        <LoopMechanismCallback />
    </Box>
}

export default LoopContainer;