import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { PetDetails } from './pages/PetDetails'
import { PetPage } from './pages/PetPage'

export function App() {
  return (
    <>
      <header>
        <h1>The Pet Palace 900</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Go Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route exact path="/">
          <PetDetails />
        </Route>
        <Route exact path="/pets/:id">
          <PetPage />
          Page 1
        </Route>
        <Route path="*">Not Found</Route>
      </Switch>
    </>
  )
}
