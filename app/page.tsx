'use client'

import React, {ReactNode, useEffect, useRef, useState} from 'react';
import Workspace from "./Workspace";
import Script from "next/script";


const WorkspacePage = () => {

    const workspaceId = useRef<string>("");
    const [workspace, setWorkspace] = useState<ReactNode>(null);
    const [visible, setVisible] = useState<boolean>(true);
    const message = useRef<string>("Create a workspace to get started!");
    const [events, setEvents] = useState<any[]>([]);
    const [eventListeners, setEventListeners] = useState<any>({
        "afterScenarioExecution": false,
        "afterScenarioExecutionExt": true
    });

    useEffect(() => {
        if (workspace) {
            eventListeners.afterScenarioExecution && window.SE?.workspace("se-container")?.events.subscribe("afterScenarioExecution", eventListener)
            eventListeners.afterScenarioExecutionExt && window.SE?.workspace("se-container")?.events.subscribe("afterScenarioExecutionExt", eventListener)
        }
    }, [workspace, eventListeners]);

    const eventListener = (e: any) => {
        setEvents(prevEvents => [...prevEvents, e])
    }


    const handleEventListeners = (eventName: string) => {
        setEventListeners((prevState: any) => {
            return {...prevState, [eventName]: !prevState[eventName]}
        });
    }

    const handleEvents = (data: any) => {
        setEvents(prevEvents => [...prevEvents, data]);
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
                handleEvents={handleEvents}
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
                <ul>
                    <li>
                        <input type="checkbox" id="afterScenarioExecutionExt" name="afterScenarioExecutionExt"
                               value="afterScenarioExecutionExt" className="mr-2"
                               checked={eventListeners.afterScenarioExecutionExt}
                               onChange={() => handleEventListeners("afterScenarioExecutionExt")}
                        />
                        <label htmlFor="afterScenarioExecutionExtExt"
                               className="text-sm mt-1">AfterScenarioExecutionExt</label>
                    </li>
                    <li>
                        <input type="checkbox" id="afterScenarioExecution" name="afterScenarioExecution"
                               value="afterScenarioExecution" className="mr-2"
                               checked={eventListeners.afterScenarioExecution}
                               onChange={() => handleEventListeners("afterScenarioExecution")}
                        />
                        <label htmlFor="afterScenarioExecution" className="text-sm mt-1">AfterScenarioExecution</label>
                    </li>
                </ul>
                <div className="w-[75%] h-[200px] border-gray-300 rounded-md p-2 overflow-x-auto">
                    {events.map((event, index) => {
                        return <p key={index}>{JSON.stringify(event)}</p>
                    })}
                </div>
            </div>

        </div>
    );
}

export default WorkspacePage;