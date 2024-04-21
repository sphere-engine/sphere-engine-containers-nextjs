import ActionPanel from "@/app/components/Panels/ActionPanel";
import VisibilityPanel from "@/app/components/Panels/VisibilityPanel";
import EventPanel from "@/app/components/Panels/EventPanel";


const MainPanel = ({isModal}: {isModal: () => void}) => {
    return (
        <div>
            <ActionPanel/>
            <VisibilityPanel isModal={isModal}/>
            <EventPanel />
        </div>
    )
}

export default MainPanel;