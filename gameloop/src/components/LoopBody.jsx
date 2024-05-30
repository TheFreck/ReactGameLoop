import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';

export const LoopBody = ({ itLives }) => {
    const [isAlive, setIsAlive] = useState(false);
    const toggleState = () => {
        setIsAlive(!isAlive);
    }
    useEffect(() => {
        setIsAlive(itLives);
    }, []);

    const OutCallback = useCallback(() =>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1010"
            height="1010"
            viewBox="0 0 100 100"
        >
            <rect x='20' y='10' width='50px' height='35px' stroke='red' strokeWidth='.1px' fill='blue' onClick={toggleState} />
            <text x='40' y='35' stroke='gray' strokeWidth='1px' fontSize='12pt' >{isAlive ? 'Yup' : 'Nope'}</text>
        </svg>
        , [isAlive]);

    return <OutCallback />;
}

export default LoopBody;