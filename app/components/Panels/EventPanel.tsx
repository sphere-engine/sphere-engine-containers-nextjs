import React, {ReactNode, useContext, useEffect, useState} from "react";
import {WorkspaceContext, WorkspaceDispatchContext} from "@/app/components/Reducers/WorkspaceReducer";

const EventPanel = () => {
    const dispatch = useContext(WorkspaceDispatchContext);
    const workspaces = useContext(WorkspaceContext);
    const [events, setEvents] = useState<string[]>([]);
    const [currentWorkspace, setCurrentWorkspace] = useState<ReactNode | null>(null)
    const [currentSubscriptions, setCurrentSubscriptions] = useState<{ name: string, handler: () => void }>()

    useEffect(() => {
        const cur = workspaces?.renderedWorkspaces.find((ws: any) => ws.id === workspaces?.selectedWorkspace)
        setCurrentWorkspace(cur?.ws)

        if (React.isValidElement(cur?.ws)) {
            setCurrentSubscriptions(React.isValidElement(cur?.ws) && cur?.ws.props?.subscriptions)
        }
    }, [currentWorkspace, workspaces]);

    const eventListener = (e: any) => {
        setEvents(prevEvents => [...prevEvents, JSON.stringify(e, null, 2)])
    }

    const clearEvents = () => {
        setEvents([])
    }

    const updateSubscriptions = (id: string, subscriptions: {}) => {
        if (dispatch) {
            dispatch({type: "UPDATE_SUBSCRIPTIONS", payload: {id: id, newProps: {subscriptions: subscriptions}}})
        }
    }

        return (
            <>
                {workspaces?.selectedWorkspace && (
                    <div className="w-[94%] flex flex-col m-auto">
                        <span className="text-xl font-semibold text-center mt-3">Events</span>
                        <ul className="flex mt-2 flex-row mb-3 w-[100%]">
                            <div className="flex flex-col mr-3 w-[50%] items-end">
                                <li className="flex flex-row">
                                    <label className="text-sm font-medium mr-3">AfterScenarioExt</label>
                                    <input type="checkbox" id="afterScenarioExecutionExt"
                                           name="afterScenarioExecutionExt"
                                           value="afterScenarioExecutionExt"
                                           checked={currentSubscriptions?.hasOwnProperty('afterScenarioExecutionExt') || false}
                                           onChange={() => updateSubscriptions(workspaces?.selectedWorkspace!, {'afterScenarioExecutionExt': eventListener})}
                                    />
                                </li>
                                <li className="flex flex-row">
                                    <label className="text-sm font-medium mr-3">AfterScenario</label>
                                    <input type="checkbox" id="afterScenarioExecution" name='afterScenarioExecution'
                                           value="afterScenarioExecution"
                                           checked={currentSubscriptions?.hasOwnProperty('afterScenarioExecution') || false}
                                           onChange={() => updateSubscriptions(workspaces?.selectedWorkspace!, {'afterScenarioExecution': eventListener})}
                                    />

                                </li>
                            </div>
                            <div className="flex flex-col w-[50%]">
                                <li className="flex flex-row">
                                    <input type="checkbox" id="fileContent" name='fileContent'
                                           value="fileContent"
                                           checked={currentSubscriptions?.hasOwnProperty('fileContent') || false}
                                             onChange={() => updateSubscriptions(workspaces?.selectedWorkspace!, {'fileContent': eventListener})}

                                    />
                                    <label className="text-sm font-medium ml-3">fileContent</label>
                                </li>
                                <li className="flex flex-row">
                                    <input type="checkbox" id="stageStream" name='stageStream'
                                           value="stageStream"
                                           checked={currentSubscriptions?.hasOwnProperty('stageStream') || false}
                                             onChange={() => updateSubscriptions(workspaces?.selectedWorkspace!, {'stageStream': eventListener})}
                                    />
                                    <label className="text-sm font-medium ml-3">stageStream</label>
                                </li>
                            </div>
                        </ul>
                        {/*Event logs*/}
                        <div
                            className="relative w-full h-[200px] border-gray-300 border-2 rounded-md p-2 overflow-hidden group no-scrollbar flex">
                            <button
                                onClick={() => {
                                    clearEvents()
                                }}
                                className="absolute top-2 right-3 z-10 bg-violet-700 text-white rounded-md text-md font-medium p-1 hidden group-hover:block hover:bg-violet-900 disabled:bg-violet-400"
                            >
                                Clear
                            </button>
                            <ul className="absolute inset-0 overflow-auto">
                                {events.map((event, index) => (
                                    <li key={index} className="text-xs font-light text-pretty"><span className="font-semibold">{index+1}.</span> {event}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </>
        );
    }

    export default EventPanel;