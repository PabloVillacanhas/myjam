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

interface Props{}

const Login: React.FC<Props> = () => {

	const [formValues, setFormValues] = useState<Session>(undefined);

	const onChangeInput = (e) => {
		setFormValues({ ...formValues, [e.target.id]: e.target.value });
	};

	return (
    <Container maxWidth="md" className={styles.Container} >
      <Card>
        <CardContent className={styles.CardContainer} >
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
        </CardContent>
      </Card> 
    </Container>
	);
};

export default Login;
