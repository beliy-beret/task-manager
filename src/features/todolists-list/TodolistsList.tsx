import React, { useEffect } from 'react'

import { AddItemForm } from 'common/components'
import { Grid } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { selectIsLoggedIn } from 'features/auth/auth.selectors'
import { selectTasks } from 'features/todolists-list/tasks/tasks.selectors'
import { todolistsThunks } from 'features/todolists-list/todolists/todolists.reducer'
import { useActions } from 'common/hooks'
import { useSelector } from 'react-redux'

//import { selectTodolists } from 'features/todolists-list/todolists/todolists.selectors'

export const TodolistsList = () => {
  //const todolists = useSelector(selectTodolists)
  const tasks = useSelector(selectTasks)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { addTodolist, fetchTodolists } = useActions(todolistsThunks)

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    fetchTodolists({})
  }, [])

  const addTodolistCallback = (title: string) => {
    return addTodolist(title).unwrap()
    // addTodolist(title)
  }

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm addItem={addTodolistCallback} />
      </Grid>
      <Grid container spacing={3}>
        {/* {todolists.map((tl) => {
          const allTodolistTasks = tasks[tl.id]

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: '10px' }}>
                <Todolist todolist={tl} tasks={allTodolistTasks} />
              </Paper>
            </Grid>
          )
        })} */}
      </Grid>
    </>
  )
}
