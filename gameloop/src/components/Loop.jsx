import React, { useCallback, useContext, useEffect, useRef } from 'react';
import LoopContext from '../contexts/LoopContext';
import { LoopBody } from './LoopBody';


export const Loop = ({loopRunner,setInstance}) => {
    const context = useContext(LoopContext);
    const loopId = Math.floor(Math.random() * 100);
    const loopRef = useRef({
        instance: Math.floor(Math.random() * 100),
        march: false,
        id: loopId
    });

    useEffect(() => {
        setInstance(loopRef.current.instance);
        return () => {
            clearInterval(loopRef.current?.intervalId);
            clearInterval(context.intervalId);
            if(loopRef.current) loopRef.current.intervalId = 0;
            context.setIntervalId(0);
        }
    }, []);

    const march = async (count) => {
        if (loopRef.current?.march) {
            loopRef.current.march = false;
            count.count++;
            loopRunner((data) => {
                console.log("data: ", data);
                console.log("data: ", (Date.now() % 100000));
                loopRef.current.march = true;
            });
        }
        console.log("pew: ", loopRef.current.loopId);
    }

    useEffect(() => {
        console.log("isRunning: ", context.isRunning);
        console.log("intervalId: ", context.intervalId);
        if (loopRef.current && context?.isRunning) {
            if (!loopRef.current?.intervalId) {
                const count = { count: 0, intId: 0 };
                loopRef.current.march = true;
                loopRef.current.intervalId = setInterval(march, context.militicks, count);
                count.intId = loopRef.current.intervalId;
                context.setIntervalId(loopRef.current.intervalId);
                console.log("setting ", loopRef.current.intervalId);
            }
        }
    }, [context.isRunning, context.intervalId]);

    const BodyCallback = useCallback(() => <div ref={loopRef}><LoopBody isLives={false} /></div>, []);

    return <BodyCallback />
}

export default Loop;