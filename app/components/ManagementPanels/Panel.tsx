import React from 'react';
import ActionPanel from "@/app/components/ManagementPanels/ActionPanel";
import EventPanel from "@/app/components/ManagementPanels/EventPanel";
import {CreateWsPanel} from "@/app/components/ManagementPanels/CreateWsPanel";

interface PanelProps {
    visible: boolean;
    handleWorkspaceVisibility: () => void;
}

const Panel: React.FC<PanelProps> = ({visible, handleWorkspaceVisibility}) => {

    return (
        <div>
            <ActionPanel visible={visible} handleWorkspaceVisibility={handleWorkspaceVisibility}/>
            <EventPanel />
        </div>
    )
}

export default Panel;