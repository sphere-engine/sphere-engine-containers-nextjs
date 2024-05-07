import React, {useContext} from "react";
import {WorkspaceContext, WorkspaceDispatchContext} from "@/app/components/Reducers/WorkspaceReducer";

const SIZES = {
    "small": {width: "60%", height: "60%"},
    "medium": {width: "80%", height: "80%"},
    "large": {width: "100%", height: "100%"}
}

const VisibilityPanel = ({toggleModal, isModal}: { toggleModal: () => void, isModal: boolean }) => {
    const dispatch = useContext(WorkspaceDispatchContext);
    const workspaces = useContext(WorkspaceContext);

    const workspace = workspaces?.renderedWorkspaces.find((ws: any) => ws.id === workspaces?.selectedWorkspace);
    const ws = workspace?.ws;

    const props = React.isValidElement(ws) ? ws?.props : {};

    const updateWorkspaceVisibility = (newProps: {}) => {
        if (dispatch) {
            dispatch({type: "UPDATE_WORKSPACE", payload: {id: workspaces?.selectedWorkspace!, newProps: newProps}})
        }
    }

    const updateWorkspaceSize = (size: { width: string, height: string }) => {
        if (dispatch) {
            dispatch({type: "UPDATE_WORKSPACE", payload: {id: workspaces?.selectedWorkspace!, newProps: size}})
        }
    }

    const removeWorkspace = (id: string) => {
        if (dispatch) {
            dispatch({type: "REMOVE_WORKSPACE", payload: id})
        }
    }

    if(!isModal) {
    return (
        <>
            {workspace ? (
                <div className="flex flex-col text-center items-center">
                    <div className="flex flex-row w-[94%]">
                        <button onClick={() => {
                            updateWorkspaceVisibility({visible: typeof props?.visible === "undefined" ? false : !props?.visible})
                        }} className="w-[94%] bg-violet-700 text-white px-3 h-8 rounded-md
            text-md font-medium mb-2 mr-2 hover:bg-violet-900">{typeof props?.visible === "undefined" ? "Hide" : props?.visible ? "Hide" : "Show"} WS
                        </button>
                        <button onClick={() => {
                            removeWorkspace(workspaces?.selectedWorkspace!)
                        }} className="w-[94%] bg-violet-700 text-white px-3 h-8 rounded-md
                        text-md font-medium mb-2 hover:bg-violet-900">Remove WS
                        </button>
                    </div>
                    <div className="flex flex-row w-[94%]">
                        <button onClick={() => {
                            const currentHeight = props?.height || "100%";
                            const newSize = currentHeight === "100%" ? "small" : currentHeight === "60%" ? "medium" : "large";
                            updateWorkspaceSize(SIZES[newSize])
                        }} className="bg-violet-700 text-white px-3 h-8 rounded-md
                        text-md font-medium mb-2 hover:bg-violet-900 w-[50%] mr-2">Change Size
                        </button>
                        <button onClick={() => toggleModal()} className="bg-violet-700 text-white px-3 h-8 rounded-md
                        text-md font-medium mb-2 hover:bg-violet-900 w-[50%]">Open Modal
                        </button>
                    </div>
                </div>
            ) : null}
        </>
    );
}
    return (
        <div className="text-center">
            <button onClick={() => {
                updateWorkspaceVisibility({visible: typeof props?.visible === "undefined" ? false : !props?.visible})
            }} className="bg-violet-700 text-white px-3 h-8 rounded-md
            text-md font-medium mb-2 mr-2 hover:bg-violet-900">{typeof props?.visible === "undefined" ? "Hide" : props?.visible ? "Hide" : "Show"} WS
            </button>
            <button onClick={() => {
                const currentHeight = props?.height || "100%";
                const newSize = currentHeight === "100%" ? "small" : currentHeight === "60%" ? "medium" : "large";
                updateWorkspaceSize(SIZES[newSize])
            }} className="bg-violet-700 text-white px-3 h-8 rounded-md
                        text-md font-medium mb-2 hover:bg-violet-900 mr-2">Change Size
            </button>
        </div>
    );
}

export default VisibilityPanel;