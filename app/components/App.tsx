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
        if (workspaces?.selectedWorkspace) {
            setWorkspace(<Workspace workspaceId={workspaces?.selectedWorkspace} key={Date.now()}/>)
        } else {
            setWorkspace(null);
        }
    }, [workspaces?.selectedWorkspace])

    return (
        <div className="flex row w-full justify-between h-full">

            <ScriptLoader/>

            <div className="w-[75%] h-[100vh]">
                {workspace ?
                    <div className="flex justify-center h-[100%]">
                        <div className="flex grow" style={{display: visible ? "block" : "none"}}>{workspace}</div>
                        <div className="text-center m-auto text-2xl"
                             style={{display: !visible ? "block" : "none"}}>Workspace Hidden</div>
                    </div> :
                    <div className="flex justify-center h-[100%]">
                        <p className="text-center m-auto text-2xl">Select a WS to start</p>
                    </div>}
            </div>

            <div className="w-[22%] mr-6">
                <Panel visible={visible} handleWorkspaceVisibility={handleWorkspaceVisibility}/>
            </div>

        </div>
    )
}