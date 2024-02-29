import React, {ReactNode, useEffect, useRef, useState} from "react";

const EventLogger: React.FC<{ workspace: ReactNode }> = ({workspace}) => {

    const [events, setEvents] = useState<string[]>([]);
    const [subscriptions, setSubscriptions] = useState<{ [name: string]: boolean }>({
        afterScenarioExecution: false,
        afterScenarioExecutionExt: false
    });

    const eventListeners = useRef<{ [name: string]: ((e: any) => void) | null }>({
        afterScenarioExecution: null,
        afterScenarioExecutionExt: null
    });

    const changeSubscription = (name: string, value: boolean) => {
        if (!workspace) return;
        const ws = window.SE.workspace("main-container");

        if (value) {
            const newEventListener = (e: any) => {
                setEvents(prevState => [...prevState, e.data])
            };
            ws.events.subscribe(name, newEventListener);

            eventListeners.current = {...eventListeners.current, [name]: newEventListener};
        } else {
            if (eventListeners.current[name]) {
                ws.events.unsubscribe(name, eventListeners.current[name]);
            }
            eventListeners.current = {...eventListeners.current, [name]: null};
        }
        setSubscriptions(prevState => ({...prevState, [name]: value}))
    }


    useEffect(() => {
        setEvents([]);
    }, [workspace]);

    return (
        <>
            <ul>
                <li>
                    <input type="checkbox" id="afterScenarioExecutionExt" name="afterScenarioExecutionExt"
                           value="afterScenarioExecutionExt" className="mr-2"
                           checked={subscriptions.afterScenarioExecutionExt}
                           disabled={!workspace}
                           onChange={() => changeSubscription('afterScenarioExecutionExt', !subscriptions.afterScenarioExecutionExt)}
                    />
                    <label htmlFor="afterScenarioExecutionExtExt"
                           className="text-sm mt-1">AfterScenarioExecutionExt</label>
                </li>
                <li>
                    <input type="checkbox" id="afterScenarioExecution" name='afterScenarioExecution'
                           value="afterScenarioExecution" className="mr-2"
                           checked={subscriptions.afterScenarioExecution}
                           disabled={!workspace}
                           onChange={() => changeSubscription('afterScenarioExecution', !subscriptions.afterScenarioExecution)}
                    />
                    <label htmlFor="afterScenarioExecution" className="text-sm mt-1">AfterScenarioExecution</label>
                </li>
            </ul>
            {/*Event logs*/}
            <div className="w-[90%] h-[200px] border-gray-300 border-2 rounded-md p-2 no-scrollbar overflow-auto">
                {events.map((event, index) => {
                    return <p key={index}>{JSON.stringify(event)}</p>
                })}
            </div>
        </>
    )
}

export default EventLogger;