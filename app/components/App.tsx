'use client'

import React, {ReactNode, useContext} from 'react';
import {WorkspaceContext} from "@/app/components/Reducers/WorkspaceReducer";
import MainPanel from "@/app/components/Panels/MainPanel";

const App = () => {
    const workspaces = useContext(WorkspaceContext);
    const [isModal, setIsModal] = React.useState(false);

    const toggleModal = () => {
        setIsModal(!isModal);
    }

    return (
        <div className="w-full h-[100vh] flex flex-row">
            <div className="w-[80%] flex justify-center items-center">
                {workspaces?.available.length === 0 &&
                    <p className="text-center text-xl font-light text-gray-500">No Workspaces Available</p>}
                {workspaces?.available.length !== 0 && !workspaces?.selectedWorkspace &&
                    <p className="text-center text-xl font-light text-gray-500">Select a WS to start</p>}
                {isModal && <p className="text-center text-xl font-light text-gray-500">WS opened in Modal</p>}
                {workspaces?.renderedWorkspaces && !isModal && (
                    workspaces.renderedWorkspaces.map((ws: { id: string, ws: ReactNode }) => {
                        const isSelected = ws.id === workspaces.selectedWorkspace;
                        const displayStyle = isSelected ? "block" : "none";
                        return (
                            <div key={ws.id} style={{display: displayStyle}} className="w-[100%] h-[100%]">
                                <div className="h-full flex justify-center items-center">
                                    {ws.ws}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            <div className="w-[20%]">
                <MainPanel isModal={toggleModal}/>
            </div>
            {isModal && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-md w-[80%] h-[85%] relative">
                        <button
                            onClick={() => setIsModal(false)} className="bg-red-700 text-white px-3 h-8 rounded-md
            text-md font-medium absolute top-4 right-5 -mt-1 -mr-1 hover:bg-violet-900">X
                        </button>
                        <p className="text-xl font-semibold text-center">WS Modal</p>

                        {workspaces?.selectedWorkspace && (
                            <div className="flex flex-col mt-2 w-full h-[95%] items-center">
                                {workspaces.renderedWorkspaces.find((ws: any) => ws.id === workspaces.selectedWorkspace)?.ws}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App