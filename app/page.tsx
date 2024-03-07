'use client'

import React from 'react';
import {WorkspacesProvider} from "@/app/components/Reducers/WorkspacesReducer";
import {App} from "@/app/components/App";

const WorkspacePage = () => {
    return (
        <div className="flex row w-full">
            <WorkspacesProvider>
                <App/>
            </WorkspacesProvider>
        </div>
    );
}

export default WorkspacePage