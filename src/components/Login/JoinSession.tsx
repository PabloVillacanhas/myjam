import { Container, Card, CardContent, FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import React, {useState} from 'react'
import { getSession } from '../../api/session'
import styles from './login.module.scss'; 
import { Link } from 'react-router-dom';

interface Props {
	
}

export const JoinSession = (props: Props) => {
	const [sessionCode, setSessionCode] = useState<string>(undefined);

	const onChangeInput = (e) => {
		setSessionCode(e.target.value);
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
              Join to session
            </FormHelperText>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              getSession(sessionCode)
            }}
          >
            Join the session
          </Button>
          <Link to={'./create'}>Or create a new one</Link>
        </CardContent>
      </Card> 
    </Container>
	)
}