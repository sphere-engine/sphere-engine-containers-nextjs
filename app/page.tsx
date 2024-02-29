'use client'

import React, {ReactNode, useRef, useState} from 'react';
import Workspace from "./Workspace";
import Modal from "react-modal";
import EventLogger from "./EventLogger";
import SdkLoader from "@/app/SdkLoader";

const WorkspacePage = () => {
    const workspaceId = useRef<string>("");
    const [workspace, setWorkspace] = useState<ReactNode | null>(null);
    const [visible, setVisible] = useState<boolean>(true);
    const message = useRef<string>("Create a workspace to get started!");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalWorkspace, setModalWorkspace] = useState<ReactNode | null>(null);

    const openModal = () => {
        if (!workspace) {
            message.current = "Create a workspace to open in modal"
        } else {
            handleCreateWorkspace("modal", true)
            setIsModalOpen(true)
            setVisible(false)
            message.current = "Workspace opened in modal"
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setModalWorkspace(null)
        setVisible(true)
    }

    const handleCreateWorkspace = (placement: string, modal: boolean) => {
        message.current = "Loading workspace...";

        const createWorkspace = (workspaceComponent: React.ReactNode) => {
            if (modal) {
                setModalWorkspace(workspaceComponent);
            } else {
                setWorkspace(workspaceComponent);
            }
        };

        const removeWorkspace = () => {
            if (modal) {
                setModalWorkspace(null);
            } else {
                setWorkspace(null);
            }
        };

        if (modal && modalWorkspace) {
            removeWorkspace();
        } else if (workspace) {
            removeWorkspace();
        }
        createWorkspace(
            <Workspace
                key={Date.now()}
                workspaceId={workspaceId.current}
                placement={placement}
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

    return (
        <div className="flex row">

            <SdkLoader/>

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
            <div className="flex grow flex-col items-center m-auto w-[25%]">
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
                        <button onClick={() => handleCreateWorkspace("main", false)} className="w-[70%] bg-violet-700 text-white px-3 h-8 mt-2 rounded-md

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
                <p className="text-xl text-center mt-3">Events</p>

                <EventLogger workspace={workspace}/>

                {/* Modal for displaying the workspace */}
                <div className="flex grow flex-col items-center mt-3">
                    <button
                        onClick={openModal}
                        className="w-full bg-violet-700 text-white px-3 h-8 mt-3 rounded-md text-md font-medium mb-2 hover:bg-violet-900"
                    >
                        Open Workspace in Modal
                    </button>
                </div>

                {/* Modal for displaying the workspace */}
                {isModalOpen && workspace && (
                    // @ts-ignore
                    <Modal onClose={closeModal} isOpen={isModalOpen} ariaHideApp={false}>
                        <div className="h-[86vh] flex flex-col items-center">
                            <div className="h-full w-full">{modalWorkspace}</div>
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

export default WorkspacePage