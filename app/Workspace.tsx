import React, {useEffect, useState} from 'react';

declare global {
    interface Window {
        SE: {
            ready: (callback: () => void) => void;
            workspace: (containerId: string) => {
                destroy: () => void;
                events: {
                    subscribe: (eventName: string, callback: (e: any) => void) => void;
                };
            }
        };
    }
}

const Workspace: React.FC<{ workspaceId: string }> = ({workspaceId}) => {

    const [wsCreated, setWsCreated] = useState<boolean>(false);


    useEffect(() => {
        window.SE?.ready(() => {
            const createWorkspace = () => {
                if (!wsCreated) {
                    console.log("Creating workspace")
                    window.SE?.workspace("se-container")
                    setWsCreated(true)
                }
            };

            createWorkspace();
        })

        return () => {
            if (wsCreated) {
                console.log("Destroying workspace")
                window.SE?.workspace("se-container").destroy();
                setWsCreated(false);
            }
        }
    }, [wsCreated]); //either wsCreated or remove the array altogether

    return (
        <div style={{width: '100%', height: '100%'}}>
            <div data-id="se-container" data-workspace={workspaceId}></div>
        </div>
    );
};

export default Workspace;