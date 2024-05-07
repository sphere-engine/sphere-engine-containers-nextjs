# sphere-engine-containers-nextjs-example

This project is an example of Sphere-Engine Workspaces using [se-containers-react](https://www.npmjs.com/package/se-containers-react)
with [Next.js](https://nextjs.org/).

## Getting started

```sh
npm install
```
it already includes the se-containers-react package, so you don't have to install it separately by 
```sh
npm install se-containers-react
```

To use the se-containers-react you need to include:
```jsx
import {Workspace} from 'se-containers-react';
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### After running the application is available at: [http://localhost:3000](http://localhost:3000)

## Application Usage

You can start by either creating new workspace by entering existing workspaceId. You can create multiple workspaces.
The rendered workspace can be managed by buttons on the right side of the screen. You can hide/show the workspace,
destroy/render it, change it's size or open it in Modal. There are also options to subscribe to events from workspace
that are checkboxes that either subscribe or unsubscribe, with a log output below.

You can create multiple workspaces and manage their render state independently.

## Example

```jsx
import React from 'react';
import {Workspace} from 'se-containers-react';

const App = () => {
    return (
        <Workspace
            workspaceId="your-workspace-id"
            subscriptions={{'afterScenarioExecution': (data) => console.log('data')}}
            visible={true}
            width="100px"
            height="200px"
        />
    );
}

export default App;
```









