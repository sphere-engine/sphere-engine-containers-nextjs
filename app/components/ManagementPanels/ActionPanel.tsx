import React, {useRef, useContext} from 'react';
import {WorkspacesDispatchContext} from "@/app/components/Reducers/WorkspacesReducer";
import {WorkspacesContext} from "@/app/components/Reducers/WorkspacesReducer";

interface PanelProps {
    visible: boolean;
    handleWorkspaceVisibility: () => void;
}

const ActionPanel: React.FC<PanelProps> = ({visible, handleWorkspaceVisibility}) => {
    const dispatch = useContext(WorkspacesDispatchContext);
    const workspaces = useContext(WorkspacesContext);
    const inputRef = useRef<string>("");

    const createWorkspace = (workspaceId: string) => {
        if (dispatch) {
            dispatch({type: "CREATE_WORKSPACE", payload: workspaceId});
        }
    }

    const selectWorkspace = (id: string) => {
        if (dispatch) {
            dispatch({type: "SELECT_WORKSPACE", payload: id});
        }
    }

    const removeWorkspace = (id: string) => {
        if (dispatch) {
            dispatch({type: "REMOVE_WORKSPACE", payload: id});
        }
    }

    const addRenderedWorkspace = (id: string) => {
        if (dispatch) {
            dispatch({type: "ADD_RENDERED_WS", payload: id});
        }
    }

    return (
        <div className="mt-2">
            <p className="text-xl text-center font-bold">Workspace Management</p>
            <div className="mt-1 w-[100%]">
                <p className="text-center text-sm text-gray-500 font-light">add existing</p>
                <div className="flex column w-[100%]">
                    <input
                        className="w-full h-8 rounded-md text-xs text-center font-medium mb-1 p-1 border-2 border-gray-300 mr-2"
                        type="text"
                        placeholder="Enter Workspace ID"
                        onChange={(e) => {
                            inputRef.current = e.target.value;
                        }}
                    />
                    <button
                        onClick={() => {
                            createWorkspace(inputRef.current);
                        }}
                        className="w-[70%] bg-violet-700 text-white px-3 h-8 rounded-md text-md font-medium mb-1 hover:bg-violet-900">
                        Add Workspace ID
                    </button>
                </div>
                <div className="w-full">
                    <p className="text-md text-center mt-3 mb-2">Available WS:</p>
                    <div className="flex row flex-wrap mb-5 justify-between">
                        {workspaces?.available.length === 0 &&
                            <p className="w-full text-center">No Workspaces Available</p>}
                        {workspaces?.available.map((workspace) => (
                            <div key={workspace.id}
                                    style={{
                                        backgroundColor: workspaces?.renderedWorkspaces.includes(workspace.id) ? "violet" : "white",
                                        borderColor: workspaces?.selectedWorkspace === workspace.id ? "darkviolet" : "#888888",
                                        width: workspaces?.available?.length > 2 ? (100 / workspaces?.available.length + "%") : "100%",
                                        minWidth: "49.5%",
                                        fontSize: workspaces?.available?.length > 2 ? "0.62rem" : "0.8rem",
                                        textAlign: workspaces?.available?.length > 2 ? "left" : "center",
                                        paddingLeft: workspaces?.available?.length > 2 ? "1%" : "0",
                                        cursor: "pointer"
                                    }}
                                    className="h-8 mb-1 border-2 border-gray-400 rounded-md font-medium flex row w-full items-center justify-center">
                                <p className="w-[60%]">{ workspaces?.available?.length > 2 ? workspace.id.substring(0,5)+"..."+workspace.id.substring(27,32) : workspace.id}</p>
                                <button onClick={() => addRenderedWorkspace(workspace.id)}
                                        className="bg-violet-700 text-white py-[3px] px-[5px] w-14 rounded-md text-md font-medium hover:bg-violet-900">
                                    {workspaces?.renderedWorkspaces.includes(workspace.id) ? "Unload" : "Load"}
                                </button>
                                <button onClick={() => {
                                    selectWorkspace(workspace.id)
                                }}
                                        disabled={workspaces?.selectedWorkspace === workspace.id}
                                        className="bg-violet-700 text-white py-[3px] px-[5px] w-14 rounded-md text-md font-medium hover:bg-violet-900 ml-[3%] disabled:bg-violet-400 mr-1">Display
                                </button>
                            </div>
                        ))}
                    </div>
                    {workspaces?.selectedWorkspace &&
                    <div className="flex row">
                        <button onClick={handleWorkspaceVisibility} className="w-[98%] bg-violet-700 text-white px-3 h-8 mt-2 rounded-md
            text-md font-medium mb-2 hover:bg-violet-900">{visible ? "Hide" : "Show "} Workspace
                        </button>
                        <button onClick={() => {
                            workspaces?.selectedWorkspace && removeWorkspace(workspaces?.selectedWorkspace)
                        }} className="w-[98%] bg-violet-700 text-white px-3 h-8 mt-2 rounded-md
            text-md font-medium mb-2 hover:bg-violet-900 ml-2">Remove Workspace
                        </button>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ActionPanel;