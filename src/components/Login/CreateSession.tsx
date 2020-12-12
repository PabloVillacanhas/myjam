import { Container, Card, CardContent, FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core'
import { Session } from '../../typings/types';
import React, { useState } from 'react'
import { postSession } from '../../api/session'
import styles from './login.module.scss'; 

interface Props {	
}

export const CreateSession = (props: Props) => {

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
        <div>Or join a new one</div>
      </Card> 
    </Container>
	)
}
