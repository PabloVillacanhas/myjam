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
import { Session } from '../../typings/types'
import React, { useState } from 'react'
import Api from '../../api/session'
import styles from './login.module.scss'
import { Link, useHistory } from 'react-router-dom'

interface Props {
  a: string
  b: string
}

export const CreateSession = (props: Props) => {
  const history = useHistory()
  const [formValues, setFormValues] = useState<Session>(undefined)

  const onChangeInput = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  return (
    <Container maxWidth="md" className={styles.Container}>
      <Card>
        <CardContent className={styles.CardContainer}>
          <FormControl>
            <InputLabel htmlFor="id">Session id</InputLabel>
            <Input id="id" aria-describedby="id_h" onChange={(e) => onChangeInput(e)} />
            <FormHelperText id="id_h">Create a new session</FormHelperText>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              Api.postSession(formValues).then(() => history.push(`session/${formValues.id}`))
            }}
          >
            Create the session
          </Button>
          <Link to={'./join'}>Or join a new one</Link>
        </CardContent>
      </Card>
    </Container>
  )
}
