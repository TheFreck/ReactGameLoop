import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Box } from '@mui/material';
import LoopContainer from './components/LoopContainer';

export const App = () => {
    const [appId,setAppId] = useState(0);

    useEffect(() => {
        if(appId === 0){
            init(id => {
                setAppId(id);
            });
        }
        else return;
    },[]);

    const init = (cb) => {
        let id = Math.floor(Math.random()*111);
        cb(id);
    }

    const LoopContainerCallback = useCallback(() => appId === 0 ? <Box>Not Ready Yet</Box> : <LoopContainer appId={appId} />,[appId]);

    return <LoopContainerCallback />
}

export default App;