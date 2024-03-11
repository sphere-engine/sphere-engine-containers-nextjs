import React, {useContext, useEffect, useRef, useState} from "react";
import {WorkspacesContext, WorkspacesDispatchContext} from "@/app/components/Reducers/WorkspacesReducer";

const EventLogger = () => {
    const workspace = useContext(WorkspacesContext)?.selectedWorkspace;
    const dispatch = useContext(WorkspacesDispatchContext);
    const workspaces = useContext(WorkspacesContext);
    const [events, setEvents] = useState<string[]>([]);
    const subscriptions = workspaces?.available.find((ws) => ws.id === workspace)?.subscriptions;
    const eventListeners = useRef<{ [name: string]: ((e: any) => void) | null }>({
        afterScenarioExecution: null,
        afterScenarioExecutionExt: null
    });

    useEffect(() => {
        setEvents([]);
    }, [workspace]);

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

    const eventListener = (e: any) => {
        setEvents((prev) => [...prev, e.data]);
    }

    useEffect(() => {
        if (!workspace) return;

        const ws = window.SE.workspace(workspace + "-container");

        const handleAfterScenarioExecution = (e: any) => {
            setEvents(prevState => [...prevState, e.data])
        };

        const handleAfterScenarioExecutionExt = (e: any) => {
            setEvents(prevState => [...prevState, e.data])
        };

        if (subscriptions?.afterScenarioExecution) {
            ws.events.subscribe("afterScenarioExecution", handleAfterScenarioExecution);
        }
        if (subscriptions?.afterScenarioExecutionExt) {
            ws.events.subscribe("afterScenarioExecutionExt", handleAfterScenarioExecutionExt);
        }

        return () => {
            ws.events.unsubscribe("afterScenarioExecution", handleAfterScenarioExecution);
            ws.events.unsubscribe("afterScenarioExecutionExt", handleAfterScenarioExecutionExt);
        };
    }, [workspace, subscriptions]);


    return (
        <>
            <ul className="flex justify-center mt-3">
                <li className="mr-2">
                    <input type="checkbox" id="afterScenarioExecutionExt" name="afterScenarioExecutionExt"
                           value="afterScenarioExecutionExt" className="mr-2"
                           checked={subscriptions?.afterScenarioExecutionExt}
                           disabled={!workspace}
                           onClick={() => toggleSubscription("afterScenarioExecutionExt")}
                    />
                    <label htmlFor="afterScenarioExecutionExtExt"
                           className="text-sm mt-1">AfterScenarioExecutionExt</label>
                </li>
                <li>
                    <input type="checkbox" id="afterScenarioExecution" name='afterScenarioExecution'
                           value="afterScenarioExecution" className="mr-2"
                           checked={subscriptions?.afterScenarioExecution}
                           disabled={!workspace}
                           onClick={() => toggleSubscription("afterScenarioExecution")}
                    />
                    <label htmlFor="afterScenarioExecution" className="text-sm mt-1">AfterScenarioExecution</label>
                </li>
            </ul>
            {/*Event logs*/}
            <div className="w-full h-[200px] border-gray-300 border-2 rounded-md p-2 no-scrollbar overflow-auto">
                {events.map((event, index) => {
                    return <p key={index}>{JSON.stringify(event)}</p>
                })}
            </div>
        </>
    )
}

export default EventLogger;