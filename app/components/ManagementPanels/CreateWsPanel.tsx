'use client'
import {useContext, useRef} from "react";
import {WorkspacesDispatchContext} from "@/app/components/Reducers/WorkspacesReducer";


export const CreateWsPanel = () => {
    const dispatch = useContext(WorkspacesDispatchContext);
    const accessToken = useRef<string>("");
    const projectId = useRef<string>("");

    const addWorkspace = (workspaceId: string) => {
        if (dispatch) {
            dispatch({type: "CREATE_WORKSPACE", payload: workspaceId});
        }
    }

    const createWorkspace = async (accessToken: string, projectId: string) => {
        const formData = new FormData();
        formData.append("project_id", projectId);

        const requestOptions = {
            method: "POST",
            body: formData,
            redirect: "follow"
        };

        try {
            // @ts-ignore
            const response = await fetch(`https://fe530c0e.containers.sphere-engine.com/api/v1/workspaces?access_token=${accessToken}`, requestOptions);
            if (response.ok) {
                response.json().then((data) => {
                    data.workspace.id && addWorkspace(data.workspace.id);
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-row justify-between w-full">
                <input
                    className="w-[40%] h-8 rounded-md text-xs text-center font-medium mb-1 mr-1 p-1.5 border-2 border-gray-300"
                    type="text"
                    placeholder={"Access Token"}
                    onChange={(e) => accessToken.current = e.target.value}
                />
                <input
                    className="w-[40%] h-8 rounded-md text-xs text-center font-medium mb-1 mr-1 p-1.5 border-2 border-gray-300"
                    type="text"
                    placeholder={"Project ID"}
                    onChange={(e) => projectId.current = e.target.value}
                />
                <button
                    className="w-[20%] bg-violet-700 text-white px-3 h-8 rounded-md text-md font-medium mb-1 hover:bg-violet-900"
                    onClick={() => {
                        createWorkspace(accessToken.current, projectId.current).then();
                    }}
                >Create
                </button>
            </div>

        </div>
    )
}