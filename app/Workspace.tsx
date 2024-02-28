import React, {useEffect, useState} from 'react';

declare global {
    interface Window {
        SE: {
            ready: (callback: () => void) => void;
            workspace: (containerId: string) => {
                destroy: () => void;
                events: {
                    subscribe: any;
                    unsubscribe: any;
                };
            }
        };
    }
}

const Workspace: React.FC<{ workspaceId: string, placement: string }> = ({workspaceId, placement}) => {
    const [wsCreated, setWsCreated] = useState<boolean>(false);

    useEffect(() => {
        window.SE?.ready(() => {
            const createWorkspace = () => {
                if (!wsCreated) {
                    window.SE?.workspace(`${placement}-container`)
                    setWsCreated(true)
                }
            };

            createWorkspace();
        })

        return () => {
            if (wsCreated) {
                window.SE?.workspace(`${placement}-container`).destroy();
                setWsCreated(false);
            }
        }
    }, [placement, wsCreated]);

    return (
        <div style={{width: '100%', height: '100%'}}>
            <div data-id={placement+"-container"} data-workspace={workspaceId}></div>
        </div>
    );
};

export default Workspace;