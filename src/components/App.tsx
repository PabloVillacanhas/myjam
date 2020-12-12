import * as React from "react";
import Login from "./Login";
import { hot } from "react-hot-loader";

class App extends React.Component<Record<string, unknown>, undefined> {
	public render() {
		return (
			<div className="app">
				<Login />
			</div>
		);
	}
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
