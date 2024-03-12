import React, {useContext} from 'react';
import Modal from 'react-modal';
import {WorkspacesContext} from "@/app/components/Reducers/WorkspacesReducer";
import Workspace from "@/app/components/Workspace";

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

export const WorkspaceModal: React.FC<ModalProps> = ({isOpen, closeModal}) => {
    const workspace = useContext(WorkspacesContext)?.selectedWorkspace

    return (
        <Modal
            isOpen={isOpen}
            ariaHideApp={false}
        >
            <div className="text-center h-[84vh]">
                {workspace && <Workspace workspaceId={workspace} key={workspace+"modal"}/>}
                <button
                    className="bg-red-500 text-white font-bold text-xl rounded-md w-[25%] mt-2.5"
                    onClick={closeModal}
                >Close
                </button>
            </div>
        </Modal>
    )
}