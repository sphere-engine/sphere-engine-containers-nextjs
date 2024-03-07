import {useReducer, createContext, ReactNode, Dispatch} from "react";

type State = {
    ids: string[];
    selectedWorkspace: string | null;
};

type Action = {
    type: string;
    payload: string;
};

const initialState: State = {
    ids: [],
    selectedWorkspace: null,
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
            if (state.ids.includes(action.payload)) {
                return state;
            }
            return {
                ...state,
                ids: [...state.ids, action.payload],
            };
        case "SELECT_WORKSPACE":
            return {
                ...state,
                selectedWorkspace: action.payload,
            };
        case "REMOVE_WORKSPACE":
            if (state.selectedWorkspace === action.payload) {
                return {
                    ...state,
                    ids: state.ids.filter((id: string) => id !== action.payload),
                    selectedWorkspace: null,
                };
            }
            return {
                ...state,
                ids: state.ids.filter((id: string) => id !== action.payload),
            };
        default:
            return state;
    }
}


export {WorkspacesContext, WorkspacesDispatchContext};
