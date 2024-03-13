# sphere-engine-containers-nextjs-example

This project is an example of using [Sphere Engine Containers](https://sphere-engine.com/containers)
with [Next.js](https://nextjs.org/).

To connect with Sphere Engine Containers, I used the provided JS
SDK: [sphere-engine-containers-js](https://docs.sphere-engine.com/containers/workspace/integration)

## Getting started

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### After running the application is available at: [http://localhost:3000](http://localhost:3000)

## Application Usage

You can start by either creating new workspace from projectId and accessToken or by entering existing workspaceId.
The rendered workspace can be managed by buttons on the right side of the screen. You can hide/show the workspace,
destroy/render it, change it's size or open it in Modal. There are also options to subscribe to events from workspace
("AfterScenarioExecution" and "AfterScenarioExectutionExt) that are checkboxes that either subscribe or unsubscribe,
with
a log output below.

##  Workspace Integration

### Including workspace in another app

You need to include the SDKLoader in parent component above where the workspace will be rendered.

```
<div>
            <ScriptLoader/>

            <div>
                {workspace &&
                    <div>{workspace}</div>
            </div>
</div>
```

Where 'workspace' is a component that render given workspace: 
```
const Workspace: React.FC<{ workspaceId: string}> = ({workspaceId}) => {
    const elemId = workspaceId + "-container";
    const [created, setCreated] = useState<boolean>(false);

    useEffect(() => {
        window.SE.ready(() => {
            if(!created) {
                window.SE.workspace(elemId);
                setCreated(true);
                console.log("Workspace created")
            }
        })

        return () => {
            if(created) {
                const ws = window.SE.workspace(elemId);
                ws?.destroy();
                setCreated(false)
                console.log("Workspace destroyed")
            }
        }
    }, [created]);

    return (
        <div style={{width: '100%', height: '100%'}}>
            <div data-id={elemId} data-workspace={workspaceId}></div>
        </div>
    );
};
```

It works by creating a new workspace in the given div element with the given workspaceId. The workspace is destroyed when
the component is unmounted. 
It's done by using 
```
window.SE.ready(() => {
window.SE.workspace(elemId);
})

const ws = window.SE.workspace(elemId);
                ws?.destroy();
```

The window.SE.ready() function is used to make sure that the SDK is loaded before creating the workspace and is required 
for the SDK to work properly.

Rest of components in the example is used to manage (e.g. add, create, render, subscribe) the workspace and subscribe to events from it.



