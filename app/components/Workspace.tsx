import React, {useEffect, useState} from 'react';


const Workspace: React.FC<{ workspaceId: string}> = ({workspaceId}) => {
    const [wsCreated, setWsCreated] = useState<boolean>(false);

    useEffect(() => {
        window.SE?.ready(() => {
            const createWorkspace = () => {
                if (!wsCreated) {
                    window.SE?.workspace(`sec-container`)
                    setWsCreated(true)
                }
            };

            createWorkspace();
        })

        return () => {
            if (wsCreated) {
                window.SE?.workspace(`sec-container`).destroy();
                setWsCreated(false);
            }
        }
    }, [workspaceId]);

    return (
        <div style={{width: '100%', height: '100%'}}>
            <div data-id={"sec-container"} data-workspace={workspaceId}></div>
        </div>
    );
};

export default Workspace;