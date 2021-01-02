import {
  Container,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from '@material-ui/core'
import React, { useState } from 'react'
import styles from './login.module.scss'
import { Link, useHistory } from 'react-router-dom'

interface Props {}

export const JoinSession = (props: Props) => {
  const history = useHistory()

  const [sessionid, setSessionid] = useState<string>(undefined)

  const onChangeInput = (e) => {
    setSessionid(e.target.value)
  }

  return (
    <Container maxWidth="md" className={styles.Container}>
      <Card>
        <CardContent className={styles.CardContainer}>
          <FormControl>
            <InputLabel htmlFor="id">Session id</InputLabel>
            <Input id="id" aria-describedby="id_h" onChange={(e) => onChangeInput(e)} />
            <FormHelperText id="id_h">Join to session</FormHelperText>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              history.push(`./session/${sessionid}`)
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
