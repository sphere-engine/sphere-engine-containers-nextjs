'use client'

import React, {ReactNode, useEffect, useRef, useState} from 'react';
import Workspace from "./Workspace";
import Script from "next/script";
import Modal from "react-modal";
import EventLogger from "./EventLogger";

const WorkspacePage = () => {
    const workspaceId = useRef<string>("");
    const [workspace, setWorkspace] = useState<ReactNode>(null);
    const [visible, setVisible] = useState<boolean>(true);
    const message = useRef<string>("Create a workspace to get started!");
    const isModalOpen = useRef<boolean>(false);

    const openModal = () => {
        if (!workspace) {
            message.current = "Create a workspace to open in modal"
        } else {
            isModalOpen.current = true;
            setVisible(false)
            message.current = "Workspace opened in modal"
        }
    }

    const closeModal = () => {
        isModalOpen.current = false;
        setVisible(true)
    }


    const handleCreateWorkspace = () => {
        message.current = "Loading workspace..."
        if (workspace) {
            handleRemoveWorkspace()
        }
        setWorkspace(
            <Workspace
                key={Date.now()}
                workspaceId={workspaceId.current}
            ></Workspace>
        );
    }

    const handleRemoveWorkspace = () => {
        message.current = "Create a workspace to get started!"
        setWorkspace(null);
        setVisible(true)
    }

    const handleWorkspaceVisibility = () => {
        workspace && setVisible(!visible);
        visible ? (message.current = "Workspace is hidden") : (message.current = "Loading ...");
    }

    // @ts-ignore
    return (
        <div className="flex row">

            {/*Workspace Part*/}
            <Script src="/seco_sdk.js" strategy={"beforeInteractive"}/>
            <div className="w-[75%] h-[100vh] flex">
                {workspace ?
                    <div className="flex grow h-[100%] justify-center">
                        <div className="flex grow" style={{display: visible ? "block" : "none"}}>{workspace}</div>
                        <div className="text-center m-auto text-2xl"
                             style={{display: !visible ? "block" : "none"}}>{message.current}</div>
                    </div> :
                    <p className="text-center m-auto text-2xl">{message.current}</p>}
            </div>

            {/*Workspace Management Part*/}
            <div className="flex grow flex-col items-center mt-3 w-[25%]">
                <p className="text-xl text-center">Workspace Management</p>
                <div className="ml-3 mr-3 mt-5 w-[90%]">
                    <div className="flex row w">
                        <input
                            className="w-full h-8 mt-2 rounded-md text-xs text-center font-medium mb-2 p-1 border-2 border-gray-300 mr-2"
                            type="text"
                            placeholder="Enter Workspace ID"
                            onChange={(e) => {
                                workspaceId.current = e.target.value;
                            }}
                        />
                        <button onClick={handleCreateWorkspace} className="w-[70%] bg-violet-700 text-white px-3 h-8 mt-2 rounded-md
                text-md font-medium mb-2 hover:bg-violet-900">Create Workspace
                        </button>
                    </div>
                    <button onClick={handleRemoveWorkspace} className="w-full bg-violet-700 text-white px-3 h-8 mt-2 rounded-md
                text-md font-medium mb-2 hover:bg-violet-900">Remove Workspace
                    </button>
                    <button onClick={handleWorkspaceVisibility} className="w-full bg-violet-700 text-white px-3 h-8 mt-2 rounded-md
                text-md font-medium mb-2 hover:bg-violet-900">{visible ? "Hide" : "Show "} Workspace
                    </button>
                </div>
                <p className="text-xl text-center mt-5">Events</p>

                <EventLogger workspace={workspace} />

                {/* Modal for displaying the workspace */}
                <div className="flex grow flex-col items-center mt-3">
                    <button
                        onClick={openModal}
                        className="w-full bg-violet-700 text-white px-3 h-8 mt-2 rounded-md text-md font-medium mb-2 hover:bg-violet-900"
                    >
                        Open Workspace in Modal
                    </button>
                </div>

                {/* Modal for displaying the workspace */}
                {isModalOpen && workspace && (
                    // @ts-ignore
                    <Modal onClose={closeModal} isOpen={isModalOpen.current}>
                        <div className="h-[86vh] flex flex-col items-center">
                        {/* Render the workspace component inside the modal */}
                            <div className="h-full w-full">{workspace}</div>
                        <button onClick={closeModal} className="w-[60%] bg-violet-700 text-white px-3 h-8 mt-2 rounded-md
                text-md font-medium hover:bg-violet-900">Close Modal
                        </button>
                        </div>
                    </Modal>
                )}
            </div>

        </div>
    );
}

export default WorkspacePage;