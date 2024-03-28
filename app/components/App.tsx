import Panel from "@/app/components/ManagementPanels/Panel";
import React, {useContext, useEffect, useState} from "react";
import {WorkspacesContext} from "@/app/components/Reducers/WorkspacesReducer";
import ScriptLoader from "@/app/components/SDK/SdkLoader";
import Workspace from "@/app/components/Workspace";
import {WorkspaceModal} from "@/app/components/Modal/Modal";

const SIZES = {
    "small": "w-[40%] h-[60vh]",
    "medium": "w-[62.5%] h-[82.5vh]",
    "large": "w-[75%] h-[100vh]"
}

const MESSAGE = {
    "modal": "Opened in Modal",
    "destroyed": "Workspaces Destroyed",
    "start": "Select a WS to start",
    "hidden": "Workspace Hidden"
}

export const App = () => {
    const workspaces = useContext(WorkspacesContext);
    const [renderedWorkspaces, setRenderedWorkspaces] = useState<React.ReactNode[]>([]);
    const [rendered, setRendered] = useState<boolean>(true);
    const [modal, setModal] = useState<boolean>(false);
    const [message, setMessage] = useState<string>(MESSAGE.start);
    const [sizeMap, setSizeMap] = useState<{ [id: string]: string }>({});
    const [visibilityMap, setVisibilityMap] = useState<{ [id: string]: boolean }>({"default": true});

    const handleWorkspaceVisibility = () => {
        if (workspaces?.selectedWorkspace) {
            const visible = visibilityMap[workspaces.selectedWorkspace];
            setVisibilityMap({
                ...visibilityMap,
                [workspaces.selectedWorkspace]: !visible
            });
            setMessage(visibilityMap[workspaces?.selectedWorkspace] ? MESSAGE.hidden : MESSAGE.start)
        }
    }

    useEffect(() => {
        if (workspaces?.renderedWorkspaces) {
            const sizes = workspaces?.renderedWorkspaces.reduce((acc: any, ws: string) => {
                acc[ws] = sizeMap[ws] ? sizeMap[ws] : SIZES.large;
                return acc;
            }, {});
            setSizeMap(sizes);

            const visibility = workspaces?.renderedWorkspaces.reduce((vacc: any, ws: string) => {
                vacc[ws] = visibilityMap.hasOwnProperty(ws) ? visibilityMap[ws] : true;
                return vacc;
            }, {});
            setVisibilityMap(visibility);

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workspaces?.renderedWorkspaces]);


    const handleRender = () => {
        setRendered(!rendered);
        setMessage(rendered ? MESSAGE.destroyed : MESSAGE.start)
    }

    const handleSize = () => {
        if (workspaces?.selectedWorkspace) {
            const newSize = sizeMap[workspaces.selectedWorkspace] === SIZES.large ? SIZES.small : sizeMap[workspaces.selectedWorkspace] === SIZES.small ? SIZES.medium : SIZES.large;
            setSizeMap({
                ...sizeMap,
                [workspaces.selectedWorkspace]: newSize
            });
        }
    }

    const handleModal = () => {
        setModal(!modal);
        setMessage(modal ? MESSAGE.modal : MESSAGE.start)
    }

    useEffect(() => {
        if (workspaces?.renderedWorkspaces) {
            const rendered = workspaces?.renderedWorkspaces.map((ws: string) => {
                const isSelected = ws === workspaces.selectedWorkspace;
                const displayStyle = isSelected ? "block" : "none";
                if (modal && isSelected) return
                return (
                    <div key={ws} style={{display: displayStyle}} className="w-full h-full">
                        <Workspace workspaceId={ws} key={ws}/>
                    </div>
                );
            });
            setRenderedWorkspaces(rendered);
        }

        if (workspaces?.renderedWorkspaces.length === 0) {
            setMessage(MESSAGE.start)
        }
    }, [workspaces?.renderedWorkspaces, workspaces?.selectedWorkspace, modal, workspaces?.available]);

    useEffect(() => {
        setRendered(true)
        setMessage(MESSAGE.start)
    }, [workspaces?.selectedWorkspace]);

    return (
        <div className="flex row w-full justify-between h-full">

            <ScriptLoader/>

            <div className={`${sizeMap[workspaces?.selectedWorkspace ?? "default"] || "w-[75%] h-[100vh]"} m-auto`}>
                {(!workspaces?.selectedWorkspace && workspaces?.renderedWorkspaces?.length !== 0 && visibilityMap[workspaces?.selectedWorkspace ?? "default"])
                || (workspaces?.renderedWorkspaces.length !== 0 && rendered) ? (
                    <div className="flex justify-center h-[100%]">
                        {(!workspaces?.selectedWorkspace && workspaces?.renderedWorkspaces?.length !== 0 && !visibilityMap[workspaces?.selectedWorkspace ?? "default"]) && (
                            <p className="absolute top-[48.3%] left-[32.04%] text-center text-2xl">{message}</p>
                        )}
                        <div className="flex grow"
                             style={{display: visibilityMap[workspaces?.selectedWorkspace ?? "default"] ? "block" : "none"}}>{renderedWorkspaces}</div>
                        <div className="text-center m-auto text-2xl"
                             style={{display: !visibilityMap[workspaces?.selectedWorkspace ?? "default"] && workspaces?.selectedWorkspace ? "block" : "none"}}>Workspace
                            Hidden
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center h-[100%]">
                        <p className="text-center m-auto text-2xl">{message}</p>
                    </div>
                )}
            </div>

            <div className="w-[22%] mr-7 ml-7">
                <Panel visible={visibilityMap[workspaces?.selectedWorkspace ?? "default"]}
                       handleWorkspaceVisibility={handleWorkspaceVisibility} setMessage={setMessage}/>
                {workspaces?.selectedWorkspace &&
                    <>
                        <button onClick={handleSize}
                                className="w-full bg-violet-700 text-white px-3 h-8 mt-4 rounded-md text-md font-medium mb-1 hover:bg-violet-900">
                            Change Size
                        </button>
                        <button
                            onClick={handleModal}
                            className="w-full bg-violet-700 text-white px-3 h-8 mt-1 mb-1  rounded-md text-md font-medium hover:bg-violet-900">
                            Open in Modal
                        </button>
                        <button onClick={handleRender}
                                className="w-full bg-violet-700 text-white px-3 h-8 mt-1 rounded-md text-md font-medium mb-1 hover:bg-violet-900">
                            {rendered ? "Destroy all WS" : "Render all WS"}
                        </button>
                    </>
                }
            </div>

            <WorkspaceModal isOpen={modal} closeModal={handleModal}></WorkspaceModal>

        </div>
    )
}