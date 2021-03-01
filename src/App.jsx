import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { PetDetails } from './pages/PetDetails'
import { PetPage } from './pages/PetPage'

export function App() {
  return (
    <>
      <header>
        <h1>The Fox Place</h1>
      </header>
      <Switch>
        <Route exact path="/">
          <PetDetails />
        </Route>
        <Route exact path="/pets/:id">
          <PetPage />
        </Route>
        <Route path="*">Not Found</Route>
      </Switch>
      <footer>
        <nav>
          <Link to="/">Go Home</Link>
        </nav>
      </footer>
    </>
  )
}
