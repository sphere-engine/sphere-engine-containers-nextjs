import React, {useReducer, createContext, ReactNode, Dispatch} from "react";
import {Workspace} from "se-containers-react";

type State = {
    available: string[];
    selectedWorkspace: string | null;
    renderedWorkspaces: Payload[];
};

type Action = {
    type: string;
    payload: Payload | UpdatePayload | string
};

type Payload = { id: string, ws: ReactNode }
type UpdatePayload = { id: string, newProps: {} }


const initialState: State = {
    available: [],
    selectedWorkspace: null,
    renderedWorkspaces: []
};

const WorkspaceContext = createContext<State | null>(null);
const WorkspaceDispatchContext = createContext<Dispatch<Action> | null>(null);

export function WorkspacesProvider({children}: Readonly<{ children: ReactNode; }>) {
    const [workspaces, dispatch] = useReducer(workspacesReducer, initialState);

    return (
        <WorkspaceContext.Provider value={workspaces}>
            <WorkspaceDispatchContext.Provider value={dispatch}>
                {children}
            </WorkspaceDispatchContext.Provider>
        </WorkspaceContext.Provider>
    );
}

export function workspacesReducer(state: any, action: any) {
    switch (action.type) {
        case "CREATE_WORKSPACE":
            if (state.available.find((ws: string) => ws === action.payload)) {
                return state;
            }
            return {
                ...state,
                available: [...state.available, action.payload]
            };
        case "UPDATE_WORKSPACE":
            const {id, newProps} = action.payload;
            return {
                ...state,
                renderedWorkspaces: state.renderedWorkspaces.map((ws: Payload) => ws.id === id ? {
                    id: id,
                    ws: <Workspace {...React.isValidElement(ws.ws) && ws.ws.props} {...newProps}/>
                } : ws)
            }
        case "SELECT_WORKSPACE": {
            return {
                ...state,
                selectedWorkspace: action.payload,
                renderedWorkspaces: state.renderedWorkspaces.find((ws: Payload) => ws.id === action.payload) ? state.renderedWorkspaces : state.renderedWorkspaces.concat({
                    id: action.payload,
                    ws: <Workspace workspaceId={action.payload}/>
                })
            }
        }
        case "ADD_RENDERED_WS": {
            if (state.renderedWorkspaces.find((ws: Payload) => ws.id === action.payload.id)) {
                return {
                    ...state,
                    renderedWorkspaces: state.renderedWorkspaces.filter((ws: Payload) => ws.id !== action.payload.id),
                    selectedWorkspace: state.selectedWorkspace === action.payload.id ? null : state.selectedWorkspace
                }
            } else {
                return {
                    ...state,
                    renderedWorkspaces: [...state.renderedWorkspaces, action.payload]
                }
            }
        }
        case "REMOVE_WORKSPACE":
            if (state.selectedWorkspace === action.payload) {
                return {
                    ...state,
                    selectedWorkspace: null,
                    available: state.available.filter((ws: string) => ws !== action.payload),
                    renderedWorkspaces: state.renderedWorkspaces.filter((ws: Payload) => ws.id !== action.payload)
                };
            }
            return {
                ...state,
                available: state.available.filter((ws: string) => ws !== action.payload),
                renderedWorkspaces: state.renderedWorkspaces.filter((ws: Payload) => ws.id !== action.payload)
            };
        case "UPDATE_SUBSCRIPTIONS":

            const currentSubscriptions = state.renderedWorkspaces.find((ws: Payload) => ws.id === action.payload.id)?.ws.props.subscriptions;
            const updatedSubscriptions = currentSubscriptions?.hasOwnProperty(Object.keys(action.payload.newProps.subscriptions)[0]) ?
                Object.keys(currentSubscriptions).length === 1 ? undefined : Object.keys(currentSubscriptions).reduce((acc: any, key: string) => {
                    if (key !== Object.keys(action.payload.newProps.subscriptions)[0]) {
                        acc[key] = currentSubscriptions[key]
                    }
                    return acc
                }, {}) : {...currentSubscriptions, ...action.payload.newProps.subscriptions}

            return {
                ...state,
                renderedWorkspaces: state.renderedWorkspaces.map((ws: Payload) => ws.id === action.payload.id ? {
                    id: action.payload.id,
                    ws: <Workspace {...React.isValidElement(ws.ws) && ws.ws.props} subscriptions={updatedSubscriptions}/>
                } : ws)
            }

    }
}

export {WorkspaceContext, WorkspaceDispatchContext}

