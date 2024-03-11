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

    return (
        <div className="mt-2">
            <p className="text-xl text-center font-bold">Workspace Management</p>
            <div className="mt-3 w-[100%]">
                <div className="flex column w-[100%]">
                    <input
                        className="w-full h-8 rounded-md text-xs text-center font-medium mb-2 p-1 border-2 border-gray-300 mr-2"
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
                        className="w-[70%] bg-violet-700 text-white px-3 h-8 rounded-md text-md font-medium mb-2 hover:bg-violet-900">
                        Add Workspace ID
                    </button>
                </div>
                <div className="w-full">
                    <p className="text-md text-center mt-3 mb-2">Available WS:</p>
                    <div className="flex row flex-wrap mb-5 justify-between">
                        {workspaces?.available.length === 0 && <p className="text-center w-full">No Workspaces Available</p>}
                        {workspaces?.available.map((workspace) => (
                            <button key={workspace.id} onClick={() => selectWorkspace(workspace.id)}
                                    style={{
                                        backgroundColor: workspaces?.selectedWorkspace === workspace.id ? "violet" : "white",
                                        width: workspaces?.available?.length > 2 ? (100 / workspaces?.available.length + "%") : "100%",
                                        minWidth: "49.5%",
                                        fontSize: workspaces?.available?.length > 2 ? "0.68rem" : "0.8rem"
                                    }}
                                    className="h-8 mb-1 border-2 border-gray-400 rounded-md font-medium">
                                {workspace.id}
                            </button>
                        ))}
                    </div>
                    <div className="flex row">
                        <button onClick={handleWorkspaceVisibility} className="w-[98%] bg-violet-700 text-white px-3 h-8 mt-2 rounded-md
            text-md font-medium mb-2 hover:bg-violet-900">{visible ? "Hide" : "Show "} Workspace
                        </button>
                        <button onClick={() => {
                            workspaces?.selectedWorkspace && removeWorkspace(workspaces?.selectedWorkspace)}} className="w-[98%] bg-violet-700 text-white px-3 h-8 mt-2 rounded-md
            text-md font-medium mb-2 hover:bg-violet-900 ml-2">Remove Workspace
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActionPanel;