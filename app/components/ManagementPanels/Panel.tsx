import React from 'react';
import ActionPanel from "@/app/components/ManagementPanels/ActionPanel";
import EventPanel from "@/app/components/ManagementPanels/EventPanel";

interface PanelProps {
    visible: boolean;
    handleWorkspaceVisibility: () => void;
    setMessage: (message: string) => void;
}

const Panel: React.FC<PanelProps> = ({visible, handleWorkspaceVisibility, setMessage}) => {

    return (
        <div>
            <ActionPanel visible={visible} handleWorkspaceVisibility={handleWorkspaceVisibility} setMessage={setMessage}/>
            <EventPanel />
        </div>
    )
}

export default Panel;