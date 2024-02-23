'use client'

import React, {ReactNode, useState} from 'react';
import Workspace from "./Workspace";
import Script from "next/script";


const WorkspacePage = () => {
    const [workspaceId, setWorkspaceId] = useState<string>("");
    const [workspace, setWorkspace] = useState<ReactNode>(null);
    const [message, setMessage] = useState<string>("Create a workspace to get started!");


    const handleCreateWorkspace = () => {
        console.log("Creating workspace")
        setMessage("Loading workspace...")
        setWorkspace(
            <Workspace
                key={Date.now()}
                workspaceId={workspaceId}
            ></Workspace>
        );
    }

    const handleRemoveWorkspace = () => {
        console.log("Removing workspace")
        setWorkspace(null);
    }

    const handleDestroyWorkspace = () => {
    }

    const handleShowWorkspace = () => {
    }

    return (
        <div className="flex row">
            <Script src="/seco_sdk.js" strategy={"beforeInteractive"}/>
            <div className="w-[75%] h-[100vh]">
                {workspace ? workspace :
                    <p className="text-center mt-[45vh] text-2xl">{message}</p>}
            </div>
            <div className="flex-grow flex-col items-center mt-3">
                <p className="text-xl text-center">Workspace Management</p>
                <div className="ml-3 mr-3 mt-5">
                <div className="flex row">
                    <input
                        className="w-full h-8 mt-2 rounded-md text-sm font-medium mb-2 p-1 border-2 border-gray-300 mr-2"
                        type="text"
                        placeholder="Enter Workspace ID"
                        value={workspaceId}
                        onChange={(e) => setWorkspaceId(e.target.value)}
                    />
                    <button onClick={handleCreateWorkspace} className="w-[70%] bg-violet-700 text-white px-3 h-8 mt-2 rounded-md
                text-md font-medium mb-2 hover:bg-violet-900">Create Workspace
                    </button>
                </div>
                <button onClick={handleRemoveWorkspace} className="w-full bg-violet-700 text-white px-3 h-8 mt-2 rounded-md
                text-md font-medium mb-2 hover:bg-violet-900">Remove Workspace
                </button>
                </div>
            </div>
        </div>
    );
}

export default WorkspacePage;