import React from 'react';
import Modal from 'react-modal';

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

export const WorkspaceModal: React.FC<ModalProps> = ({isOpen, closeModal}) => {
    return (
        <Modal
            isOpen={isOpen}
        >
            <div className="h-full text-center">
                <div className="h-[95%]"></div>
                <button
                    className="bg-red-500 text-white font-bold text-xl rounded-md w-[25%]"
                    onClick={closeModal}
                >Close
                </button>
            </div>
        </Modal>
    )
}