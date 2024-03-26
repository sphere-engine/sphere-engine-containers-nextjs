import {useReducer, createContext, ReactNode, Dispatch} from "react";

type State = {
    available: Workspace[];
    selectedWorkspace: string | null;
    renderedWorkspaces: string[];
};

type Action = {
    type: string;
    payload: string | { id: string, name: string } | { id: string, event: string };
};

type Workspace = {
    id: string,
    subscriptions: {
        [name: string]: boolean
    }
    events: string[]
}

const initialState: State = {
    available: [],
    selectedWorkspace: null,
    renderedWorkspaces: []
};

const WorkspacesContext = createContext<State | null>(null);
const WorkspacesDispatchContext = createContext<Dispatch<Action> | null>(null);

export function WorkspacesProvider({children}: Readonly<{ children: ReactNode; }>) {
    const [workspaces, dispatch] = useReducer(workspacesReducer, initialState);

    return (
        <WorkspacesContext.Provider value={workspaces}>
            <WorkspacesDispatchContext.Provider value={dispatch}>
                {children}
            </WorkspacesDispatchContext.Provider>
        </WorkspacesContext.Provider>
    );
}


export function workspacesReducer(state: any, action: any) {
    switch (action.type) {
        case "CREATE_WORKSPACE":
            if (state.available.find((ws: Workspace) => ws.id === action.payload)) {
                return state;
            }
            return {
                ...state,
                available: [...state.available, {
                    id: action.payload, subscriptions: {
                        afterScenarioExecution: false,
                        afterScenarioExecutionExt: false
                    }, events: []
                }]
            };
        case "SELECT_WORKSPACE":
            return {
                ...state,
                selectedWorkspace: action.payload,
                renderedWorkspaces: state.renderedWorkspaces.includes(action.payload) ?
                    state.renderedWorkspaces :
                    [...state.renderedWorkspaces, action.payload]
            };
        case "REMOVE_WORKSPACE":
            if (state.selectedWorkspace === action.payload) {
                return {
                    ...state,
                    selectedWorkspace: null,
                    available: state.available.filter((ws: Workspace) => ws.id !== action.payload)
                };
            }
            return {
                ...state,
                available: state.available.filter((ws: Workspace) => ws.id !== action.payload)
            };
        case "TOGGLE_SUBSCRIPTION":
            return {
                ...state,
                available: state.available.map((ws: Workspace) => {
                    if (ws.id === action.payload.id) {
                        return {
                            ...ws,
                            subscriptions: {
                                ...ws.subscriptions,
                                [action.payload.name]: !ws.subscriptions[action.payload.name]
                            }
                        }
                    }
                    return ws;
                })
            };
        case "ADD_EVENT":
            return {
                ...state,
                available: state.available.map((ws: Workspace) => {
                    if (ws.id === action.payload.id) {
                        return {
                            ...ws,
                            events: [...ws.events, action.payload.event]
                        }
                    }
                    return ws;
                })
            }
        case "ADD_RENDERED_WS":
            return {
                ...state,
                renderedWorkspaces: state.renderedWorkspaces.includes(action.payload) ?
                    state.renderedWorkspaces.filter((ws: string) => ws !== action.payload) :
                    [...state.renderedWorkspaces, action.payload],
                selectedWorkspace: state.selectedWorkspace === action.payload ? null : state.selectedWorkspace

            }
        case "CLEAR_EVENTS":
            return {
                ...state,
                available: state.available.map((ws: Workspace) => {
                    if (ws.id === action.payload) {
                        return {
                            ...ws,
                            events: []
                        }
                    }
                    return ws;
                })
            }
        default:
            return state;

    }
}

export {WorkspacesContext, WorkspacesDispatchContext};
