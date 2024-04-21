'use client'

import {ReactNode, useContext, useState} from "react";
import {WorkspaceContext, WorkspaceDispatchContext} from "@/app/components/Reducers/WorkspaceReducer";
import {Workspace} from "se-containers-react";

const ActionPanel = () => {
    const dispatch = useContext(WorkspaceDispatchContext);
    const workspaces = useContext(WorkspaceContext);
    const [workspaceId, setWorkspaceId] = useState<string>('')

    const createWorkspace = (id: string) => {
        if (dispatch) {
            dispatch({type: "CREATE_WORKSPACE", payload: id});
        }
        setWorkspaceId("")
    }

    const selectWorkspace = (id: string) => {
        if (dispatch) {
            dispatch({type: "SELECT_WORKSPACE", payload: id})
        }
    }

    const addRenderedWorkspace = (id: string, workspace: ReactNode) => {
        if (dispatch) {
            dispatch({type: "ADD_RENDERED_WS", payload: {id: id, ws: workspace}})
        }
    }

    type Payload = { id: string, ws: ReactNode }

    return (
        <div className="mt-2 flex flex-col text-center items-center">
            <p className="text-xl font-bold">Workspace Management</p>
            <div className="mt-1 w-[94%]">
                <p className="text-center text-sm mb-1 text-gray-500 font-light">add existing workspace</p>
                <div className="flex column w-[100%]">
                    <input
                        className="w-full h-8 rounded-md text-xs text-center font-medium mb-1 p-1 border-2 border-gray-300 mr-2"
                        type="text"
                        value={workspaceId}
                        placeholder="Enter Workspace ID"
                        onChange={(e) => {
                            setWorkspaceId(e.target.value)
                        }}
                    />
                    <button
                        onClick={() => {
                            workspaceId && createWorkspace(workspaceId)
                        }}
                        className="w-[70%] bg-violet-700 text-white px-3 h-8 rounded-md text-md font-medium mb-1 hover:bg-violet-900">
                        Add WS
                    </button>
                </div>
                <div className="w-full flex flex-col text-center">
                    <p className="text-md mt-3 mb-2">Available WS:</p>
                    <div className="flex row flex-wrap mb-5 justify-between">
                        {workspaces?.available.length === 0 &&
                            <p className="w-full text-center">No Workspaces Available</p>}
                        {workspaces?.available.map((workspace) => (
                            <div key={workspace}
                                 style={{
                                     backgroundColor: workspaces?.renderedWorkspaces.find((ws: Payload) => ws.id === workspace) ? "violet" : "white",
                                     borderColor: workspaces?.selectedWorkspace === workspace ? "darkviolet" : "#888888",
                                     width: workspaces?.available?.length > 2 ? (100 / workspaces?.available.length + "%") : "100%",
                                     minWidth: "49.5%",
                                     fontSize: workspaces?.available?.length > 2 ? "0.62rem" : "0.8rem",
                                     textAlign: workspaces?.available?.length > 2 ? "left" : "center",
                                     paddingLeft: workspaces?.available?.length > 2 ? "1%" : "0",
                                     cursor: "pointer"
                                 }}
                                 className="h-8 mb-1 border-2 border-gray-400 rounded-md font-medium flex row w-full items-center justify-center">
                                <p className="w-[60%]">{workspaces?.available?.length > 2 ? workspace.substring(0, 5) + "..." + workspace.substring(27, 32) : workspace.substring(0, 8) + "..." + workspace.substring(22, 32)}</p>
                                <button onClick={() => {
                                    addRenderedWorkspace(workspace, <Workspace workspaceId={workspace}/>)
                                }}
                                        className="bg-violet-700 text-white py-[3px] px-[5px] w-14 rounded-md text-md font-medium hover:bg-violet-900">
                                    {workspaces?.renderedWorkspaces.find((ws: Payload) => ws.id === workspace) ? "Unload" : "Load"}
                                </button>
                                <button onClick={() => {
                                    selectWorkspace(workspace)
                                }}
                                        disabled={workspaces?.selectedWorkspace === workspace}
                                        className="bg-violet-700 text-white py-[3px] px-[5px] w-14 rounded-md text-md font-medium hover:bg-violet-900 ml-[3%] disabled:bg-violet-400 mr-1">Display
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ActionPanel