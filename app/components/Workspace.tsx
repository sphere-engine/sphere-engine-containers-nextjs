import React, {useEffect, useState} from 'react';

const Workspace: React.FC<{ workspaceId: string}> = ({workspaceId}) => {

    const elemId = workspaceId + "-container";
    const [created, setCreated] = useState<boolean>(false);


    useEffect(() => {
        window.SE.ready(() => {
            if(!created) {
            window.SE.workspace(elemId);
            setCreated(true);
            console.log("Workspace created")
            }
        })

        return () => {
            if(created) {
                const ws = window.SE.workspace(elemId);
                ws?.destroy();
                setCreated(false)
                console.log("Workspace destroyed")
            }
        }
    }, [created, elemId]); // bez created w zależnościach, workspace nie renderuje się od nowa (#1)

    return (
        <div style={{width: '100%', height: '100%'}}>
            <div data-id={elemId} data-workspace={workspaceId}></div>
        </div>
    );
};

export default Workspace;