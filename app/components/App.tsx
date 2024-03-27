import Panel from "@/app/components/ManagementPanels/Panel";
import React, {useContext, useEffect, useState} from "react";
import {WorkspacesContext} from "@/app/components/Reducers/WorkspacesReducer";
import ScriptLoader from "@/app/components/SDK/SdkLoader";
import Workspace from "@/app/components/Workspace";
import {WorkspaceModal} from "@/app/components/Modal/Modal";
import workspace from "@/app/components/Workspace";

const SIZES = {
    "small": "w-[40%] h-[60vh]",
    "medium": "w-[62.5%] h-[82.5vh]",
    "large": "w-[75%] h-[100vh]"
}

const MESSAGE = {
    "modal": "Opened in Modal",
    "destroyed": "Workspace Destroyed",
    "start": "Select a WS to start",
    "hidden": "Workspace Hidden"
}

export const App = () => {
    const workspaces = useContext(WorkspacesContext);
    const [visible, setVisible] = useState<boolean>(true);
    const [renderedWorkspaces, setRenderedWorkspaces] = useState<React.ReactNode[]>([]);
    const [rendered, setRendered] = useState<boolean>(true);
    const [size, setSize] = useState<string>(SIZES.large);
    const [modal, setModal] = useState<boolean>(false);
    const [message, setMessage] = useState<string>(MESSAGE.start);

    const handleWorkspaceVisibility = () => {
        if (workspaces?.selectedWorkspace) {
            setVisible(!visible);
            setMessage(visible ? MESSAGE.hidden : MESSAGE.start)
        }
    }

    const handleRender = () => {
        setRendered(!rendered);
        setMessage(rendered ? MESSAGE.destroyed : MESSAGE.start)
    }

    const handleSize = () => {
        if (size === SIZES.small) {
            setSize(SIZES.medium)
        } else if (size === SIZES.medium) {
            setSize(SIZES.large)
        } else {
            setSize(SIZES.small)
        }
    }

    const handleModal = () => {
        setModal(!modal);
        setMessage(modal ? MESSAGE.modal : MESSAGE.start)
    }

    useEffect(() => {
        if(!modal){
        if (workspaces?.renderedWorkspaces) {
            const rendered = workspaces?.renderedWorkspaces.map((ws: string) => {
                const isSelected = ws === workspaces.selectedWorkspace;
                const displayStyle = isSelected ? "block" : "none";
                return (
                    <div key={ws} style={{display: displayStyle}} className="w-full h-full">
                        <Workspace workspaceId={ws} key={ws}/>
                    </div>
                );
            });
            setRenderedWorkspaces(rendered);
        }} else {
            setRenderedWorkspaces([]);
        }

        if(workspaces?.renderedWorkspaces.length === 0){
            setVisible(true);
            setMessage(MESSAGE.start)
        }
    }, [workspaces?.renderedWorkspaces, workspaces?.selectedWorkspace, modal, workspaces?.available]);

    useEffect(() => {
        setRendered(true)
        setVisible(true)
        setMessage(MESSAGE.start)
    }, [workspaces?.selectedWorkspace]);

    return (
        <div className="flex row w-full justify-between h-full">

            <ScriptLoader/>

            <div className={`${size} m-auto`}>
                {!workspaces?.selectedWorkspace && workspaces?.renderedWorkspaces?.length != 0 && visible && <p className="absolute top-[48.3%] left-[32.04%] text-center m-auto text-2xl">{message}</p>}
                {workspaces?.renderedWorkspaces.length != 0 && rendered  ?
                    <div className="flex justify-center h-[100%]">
                        <div className="flex grow"
                             style={{display: visible ? "block" : "none"}}>{renderedWorkspaces}</div>
                        <div className="text-center m-auto text-2xl"
                             style={{display: !visible ? "block" : "none"}}>Workspace Hidden
                        </div>
                    </div> :
                    <div className="flex justify-center h-[100%]">
                        <p className="text-center m-auto text-2xl">{message}</p>
                    </div>
                }
            </div>

            <div className="w-[22%] mr-7 ml-7">
                <Panel visible={visible} handleWorkspaceVisibility={handleWorkspaceVisibility} setMessage={setMessage}/>
                {workspaces?.selectedWorkspace &&
                    <>
                        <button onClick={handleRender}
                                className="w-full bg-violet-700 text-white px-3 h-8 mt-4 rounded-md text-md font-medium mb-1 hover:bg-violet-900">
                            {rendered ? "Destroy WS" : "Render WS"}
                        </button>
                        <button onClick={handleSize}
                                className="w-full bg-violet-700 text-white px-3 h-8 mt-1 rounded-md text-md font-medium mb-1 hover:bg-violet-900">
                            Change Size
                        </button>
                        <button
                            onClick={handleModal}
                            className="w-full bg-violet-700 text-white px-3 h-8 mt-1 rounded-md text-md font-medium hover:bg-violet-900">
                            Open in Modal
                        </button>
                    </>
                }
            </div>

            <WorkspaceModal isOpen={modal} closeModal={handleModal}></WorkspaceModal>

        </div>
    )
}