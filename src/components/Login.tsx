import * as React from "react";
import {
	Container,
	FormControl,
	FormHelperText,
	Input,
	InputLabel,
	Button,
} from "@material-ui/core";
import { useState } from "react";
import { postSession } from "../api/session";
import { Session } from "../types/types";

const Login: React.FC<{}> = () => {
	const [formValues, setFormValues] = useState<Session>(undefined);

	const onChangeInput = (e) => {
		setFormValues({ ...formValues, [e.target.id]: e.target.value });
	};

	return (
		<Container maxWidth="md">
			<FormControl>
				<InputLabel htmlFor="code">Session code</InputLabel>
				<Input
					id="code"
					aria-describedby="code_h"
					onChange={(e) => onChangeInput(e)}
				/>
				<FormHelperText id="code_h">
					Create a new session
				</FormHelperText>
			</FormControl>
			<Button
				variant="contained"
				color="primary"
				onClick={() => {
					postSession(formValues)
				}}
			>
				Create the session
			</Button>
      {JSON.stringify(formValues)}
		</Container>
	);
};

export default Login;
