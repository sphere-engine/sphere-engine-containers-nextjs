import React, {useEffect, useState} from 'react';


const Workspace: React.FC<{ workspaceId: string}> = ({workspaceId}) => {

    const elemId = workspaceId + "-container";
    const [created, setCreated] = useState<boolean>(false);


    useEffect(() => {
        window.SE.ready(() => {
            if(!created) {
            console.log("Workspace ready")
            window.SE.workspace(elemId);
            setCreated(true);
            }
        })

        return () => {
            if(created) {
                const ws = window.SE.workspace(elemId);
                ws.destroy();
                console.log("Workspace destroyed")
                setCreated(false)
            }
        }
    }, [created, elemId]);

    return (
        <div style={{width: '100%', height: '100%'}}>
            <div data-id={elemId} data-workspace={workspaceId}></div>
        </div>
    );
};

export default Workspace;