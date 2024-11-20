import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { LoopContainer } from './components/LoopContainer';

function App() {
    const [appId, setAppId] = useState(0);

    useEffect(() => {
        if(appId === 0){
            init(id => {
            })
        }
        else return;
    },[]);

    const init = (cb) => {
        let id = Math.floor(Math.random()*111);
        setAppId(id);
        cb(id);
    }

    const LoopContainerCallback = useCallback(() => appId === 0 ? <div>Not ready yet</div> : <LoopContainer appId={appId} />,[appId]);

    return <LoopContainerCallback />
}

export default App;