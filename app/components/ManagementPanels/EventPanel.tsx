import React, {useContext, useEffect, useRef, useState} from "react";
import {WorkspacesContext, WorkspacesDispatchContext} from "@/app/components/Reducers/WorkspacesReducer";

const EventLogger = () => {
    const workspace = useContext(WorkspacesContext)?.selectedWorkspace;
    const dispatch = useContext(WorkspacesDispatchContext);
    const workspaces = useContext(WorkspacesContext);
    const events = workspaces?.available.find((ws) => ws.id === workspace)?.events;
    const subscriptions = workspaces?.available.find((ws) => ws.id === workspace)?.subscriptions || {
        afterScenarioExecution: false,
        afterScenarioExecutionExt: false
    };
    const eventListeners = useRef<{ [name: string]: ((e: any) => void) | null }>({
        afterScenarioExecution: null,
        afterScenarioExecutionExt: null
    });

    // const EventLogger = (e: any) => {
    //     setEvents(prevState => [...prevState, e.data])
    // }
    //
    //  ws.events.subscribe("afterScenarioExecution", EventLogger)
    // ws.events.subscribe("afterScenarioExecutionExt", EventLogger)
    //
    //  ws.events.unsubscribe("afterScenarioExecution", EventLogger)
    // ws.events.unsubscribe("afterScenarioExecutionExt", EventLogger)
    // jak ta funkcja jest uzyta zamiast w to wystepuje warn "specified callback does not exist", ale same subskrypcje dalej działaja(#4)

    const addEvent = (e: any) => {
        if (workspace) {
            dispatch?.({
                type: "ADD_EVENT",
                payload: {
                    id: workspace,
                    event: JSON.stringify(e)
                }
            })
        }
    }

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

        const ws = window.SE.workspace(workspace + "-container");

        if (eventListeners.current[name]) {
            ws.events.unsubscribe(name, eventListeners.current[name]!);
            eventListeners.current[name] = null;
        } else {
            eventListeners.current[name] = (e: any) => {
                addEvent(e);
            }
            ws.events.subscribe(name, eventListeners.current[name]!);
        }
    }

    return (
        <>
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
                    <label htmlFor="afterScenarioExecution" className="text-sm mt-1">AfterScenarioExecution</label>
                </li>
            </ul>
            {/*Event logs*/}
            <div className="w-full h-[200px] border-gray-300 border-2 rounded-md p-2 no-scrollbar overflow-auto">
                <ul>
                    {events?.map((event, index) => (
                        <li key={index} className="text-xs">{event}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}
export default EventLogger;