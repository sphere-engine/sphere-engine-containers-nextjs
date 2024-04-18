'use client'

import React, {useState} from 'react';
import {Workspace} from 'seco-sdk-react';

const WorkspacePage = () => {
    const handleEvent = (event: any) => {
        console.log(event)
    }

    const [subscriptions, setSubscriptions] = useState<{ [event: string]: ((e: any) => void) }>({
        "afterScenarioExecutionExt": handleEvent,
        "afterScenarioExecution": handleEvent,
    })

    const workspaceId = "b24c9cebeefe4f5180f31aa80c6139ee"
    const width = "100%"
    const height = "100%"

    const changeSubscription = () => {
        if(subscriptions["afterScenarioExecution"]) {
            setSubscriptions({
                "afterScenarioExecutionExt": handleEvent,
            })} else {
            setSubscriptions({
                "afterScenarioExecution": handleEvent,
                "afterScenarioExecutionExt": handleEvent,
            })
        }
    }

    return (
        <div className="w-full h-[100vh]">
            <Workspace workspaceId={workspaceId} width={width} height={height} visible={true}
                       subscriptions={subscriptions}/>
            <button onClick={changeSubscription}>Change subscription</button>
        </div>
    );
}

export default WorkspacePage