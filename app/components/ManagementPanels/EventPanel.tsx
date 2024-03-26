import React, {useCallback, useContext, useEffect, useRef} from "react";
import {WorkspacesContext, WorkspacesDispatchContext} from "@/app/components/Reducers/WorkspacesReducer";

const EventLogger = () => {
    const workspace = useContext(WorkspacesContext)?.selectedWorkspace;
    const dispatch = useContext(WorkspacesDispatchContext);
    const workspaces = useContext(WorkspacesContext);
    const events = workspaces?.available.find((ws) => ws.id === workspace)?.events;
    const subscriptions = workspaces?.available.find((ws) => ws.id === workspace)?.subscriptions || {};
    const eventListeners = useRef<{ [name: string]: ((e: any) => void) | null }>({
        afterScenarioExecution: null,
        afterScenarioExecutionExt: null
    });

    const handleClear = () => {
        if (workspace) {
            dispatch?.({
                type: "CLEAR_EVENTS",
                payload: workspace
            })
        }
    }

    const _onEvent = useCallback((e: any) => {
        console.log('Adding to', workspace)
        if (workspace) {
            dispatch?.({
                type: "ADD_EVENT",
                payload: {
                    id: workspace,
                    event: JSON.stringify(e)
                }
            })
        }
    }, [workspace, dispatch]);

    // const addEvent = (e: any) => {
    //     console.log('Adding to', workspace)
    //     if (workspace) {
    //         dispatch?.({
    //             type: "ADD_EVENT",
    //             payload: {
    //                 id: workspace,
    //                 event: JSON.stringify(e)
    //             }
    //         })
    //     }
    // }

    const toggleSubscription = (name: string) => {
        if (workspace) {
            dispatch?.({
                type: "TOGGLE_SUBSCRIPTION",
                payload: {
                    id: workspace,
                    name: name
                }
            })
        }
    }

    useEffect(() => {
        if (workspace) {
            const ws = window.SE.workspace(workspace + "-container");
            if (ws) {
                if (subscriptions.afterScenarioExecution) {
                    eventListeners.current.afterScenarioExecution = (e: any) => {
                        _onEvent(e);
                    }
                    console.log('Subscribing to afterScenarioExecution', workspace)
                    ws.events.subscribe("afterScenarioExecution", eventListeners.current.afterScenarioExecution);
                }

                if (subscriptions.afterScenarioExecutionExt) {
                    eventListeners.current.afterScenarioExecutionExt = (e: any) => {
                        _onEvent(e);
                    }
                    console.log('Subscribing to afterScenarioExecutionExt', workspace)
                    ws.events.subscribe("afterScenarioExecutionExt", eventListeners.current.afterScenarioExecutionExt);
                }


            }
        }
    }, [_onEvent, subscriptions, workspace]);

    return (
        <>
            {workspaces?.selectedWorkspace &&
                <div>
                    <ul className="flex justify-center mt-2">
                        <li className="mr-4">
                            <input type="checkbox" id="afterScenarioExecutionExt" name="afterScenarioExecutionExt"
                                   value="afterScenarioExecutionExt" className="mr-2"
                                   checked={subscriptions?.afterScenarioExecutionExt}
                                   disabled={!workspace}
                                   onChange={() => toggleSubscription("afterScenarioExecutionExt")}
                            />
                            <label htmlFor="afterScenarioExecutionExtExt"
                                   className="text-sm mt-1">AfterScenarioExecutionExt</label>
                        </li>
                        <li>
                            <input type="checkbox" id="afterScenarioExecution" name='afterScenarioExecution'
                                   value="afterScenarioExecution" className="mr-2"
                                   checked={subscriptions?.afterScenarioExecution}
                                   disabled={!workspace}
                                   onChange={() => toggleSubscription("afterScenarioExecution")}
                            />
                            <label htmlFor="afterScenarioExecution"
                                   className="text-sm mt-1">AfterScenarioExecution</label>
                        </li>
                    </ul>
                    {/*Event logs*/}
                    <div
                        className="relative w-full h-[200px] border-gray-300 border-2 rounded-md p-2 overflow-hidden group no-scrollbar">
                        <button
                            onClick={() => {
                                handleClear();
                            }}
                            className="absolute top-2 right-3 z-10 bg-violet-700 text-white rounded-md text-md font-medium p-1 hidden group-hover:block hover:bg-violet-900 disabled:bg-violet-400"
                        >
                            Clear
                        </button>
                        <ul className="absolute inset-0 overflow-auto">
                            {events?.map((event, index) => (
                                <li key={index} className="text-xs text-left relative break-words">
                                    {event}
                                </li>
                            ))}
                        </ul>
                    </div>


                </div>
            }
        </>
    )
}
export default EventLogger;