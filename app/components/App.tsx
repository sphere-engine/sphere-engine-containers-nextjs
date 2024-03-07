import Panel from "@/app/components/ManagementPanels/Panel";
import React, {useContext, useEffect, useState} from "react";
import {WorkspacesContext} from "@/app/components/Reducers/WorkspacesReducer";
import ScriptLoader from "@/app/components/SDK/SdkLoader";
import Workspace from "@/app/components/Workspace";

export const App = () => {
    const workspaces = useContext(WorkspacesContext);
    const [visible, setVisible] = useState<boolean>(true);
    const [workspace, setWorkspace] = useState<React.ReactNode | null>(null);

    const handleWorkspaceVisibility = () => {
        if (workspaces?.selectedWorkspace !== "")
            setVisible(!visible);
    }

    useEffect(() => {
        if (workspaces?.selectedWorkspace){
            setWorkspace(<Workspace workspaceId={workspaces.selectedWorkspace}/>);
            console.log("workspace changed")
        }

    }, [workspaces?.selectedWorkspace]);

    return (
        <div className="flex row w-full">
            <ScriptLoader/>
            <div className="w-[75%]">
                {workspace}
            </div>
            <div className="w-[25%] mr-6">
                <Panel visible={visible} handleWorkspaceVisibility={handleWorkspaceVisibility}/>
            </div>
        </div>
    )
}