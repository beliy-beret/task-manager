import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { useEffect } from 'react'
import { selectAppStatus, selectIsInitialized } from 'app/app.selectors'

import { ErrorSnackbar } from 'common/components'
import { Login } from 'features/auth/Login/Login'
import { Menu } from '@mui/icons-material'
import { TodolistsList } from 'features/todolists-list/TodolistsList'
import { authThunks } from 'features/auth/auth.reducer'
import { selectIsLoggedIn } from 'features/auth/auth.selectors'
import { useActions } from 'common/hooks'
import { useSelector } from 'react-redux'

const App = () => {
  const status = useSelector(selectAppStatus)
  const isInitialized = useSelector(selectIsInitialized)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { initializeApp, logout } = useActions(authThunks)

  useEffect(() => {
    initializeApp({})
  }, [])

  const logoutHandler = () => logout({})

  if (!isInitialized) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30%',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <ErrorSnackbar />
        <AppBar position='static'>
          <Toolbar>
            <IconButton edge='start' color='inherit' aria-label='menu'>
              <Menu />
            </IconButton>
            <Typography variant='h6'>News</Typography>
            {isLoggedIn && (
              <Button color='inherit' onClick={logoutHandler}>
                Log out
              </Button>
            )}
          </Toolbar>
          {status === 'loading' && <LinearProgress />}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={'/'} element={<TodolistsList />} />
            <Route path={'/login'} element={<Login />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default App
