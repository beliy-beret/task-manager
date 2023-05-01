import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  LinearProgress,
  Toolbar,
} from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { useEffect } from 'react'
import { selectAppStatus, selectIsInitialized } from 'app/app.selectors'

import { Desk } from 'features/crm/desk'
import { ErrorSnackbar } from 'common/components'
import { Login } from 'features/auth/Login/Login'
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
      <ErrorSnackbar />
      <AppBar position='sticky'>
        <Toolbar>
          {isLoggedIn && (
            <Button
              color='inherit'
              sx={{ fontWeight: '800' }}
              onClick={logoutHandler}
            >
              Logout
            </Button>
          )}
        </Toolbar>
        {status === 'loading' && <LinearProgress />}
      </AppBar>
      <Container maxWidth={false} sx={{ maxWidth: '1980px', height: '100%' }}>
        <Routes>
          <Route path={'/'} element={<Desk />} />
          <Route path={'/login'} element={<Login />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
