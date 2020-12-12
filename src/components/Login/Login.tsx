import * as React from "react";
import {
	Container,
	FormControl,
	FormHelperText,
	Input,
	InputLabel,
  Button,
  Card,
  CardContent,
} from "@material-ui/core";
import { useState } from "react";
import { postSession } from "../../api/session";
import { Session } from "../../typings/types";
import styles from './login.module.scss'; 
import { CreateSession } from "./CreateSession";
import { JoinSession } from "./JoinSession";

interface Props{}

const Login: React.FC<Props> = () => {

  const [newSession, setNewSession] = useState(false)

	return (
    newSession? <CreateSession/> : <JoinSession/>
	);
};

export default Login;
