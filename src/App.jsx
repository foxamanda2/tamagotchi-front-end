import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { PetDetails } from './pages/PetDetails'

export function PetPage() {
  const [pickedPet, setPickedPet] = useState({})

  const [feeding, setFeeding] = useState({})

  const [playtime, setPlaytime] = useState({})

  const [scolding, setScolding] = useState({})

  const params = useParams()

  useEffect(async () => {
    const resp = await axios.get(
      `https://amandaf-tamagotchi.herokuapp.com/api/pets/${params.id}`
    )
    setPickedPet(resp.data)
  }, [params.id])

  const history = useHistory()

  async function deletePetItem() {
    const response = await axios.delete(
      `https://amandaf-tamagotchi.herokuapp.com/api/pets/${params.id}}`
    )
    history.push('/')
  }

  return (
    <>
      <button>Playtime</button>
      <button>Feeding</button>
      <button>Scolding</button>
      <button onClick={deletePetItem}>Delete</button>
    </>
  )
}

export function App() {
  // useEffect(async () => {
  //   const resp = await axios.get(
  //     `https://amandaf-tamagotchi.herokuapp.com/api/Pets/${params.id}/playtimes`
  //   )
  //   setFeeding(resp.data)
  // }, [params.id])

  // let petItems = Object.entries(playtime).map(([petCode, petDetails]) => {
  //   return (
  //     <li key={petDetails.id}>
  //       {' '}
  //       {petDetails.name} Hunger:{petDetails.hungerLevel} Happiness:
  //       {petDetails.happinessLevel}
  //     </li>
  //   )
  // })

  // Refresh List of Pets

  return (
    <>
      <header>
        <h1>Welcome to my SPA</h1>
        <nav>
          <PetDetails />
          <ul>
            <li>
              <Link to="/">Go Home</Link>
            </li>
            <li>
              <Link to={`/pets/id`}>Show</Link>
            </li>
            <li>
              <Link to="/2">Page 2</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route exact path="/">
          Home
        </Route>
        <Route exact path="/pets/id">
          <PetPage />
          Page 1
        </Route>
        <Route exact path="/2">
          Page 2
        </Route>
        <Route path="*">Not Found</Route>
      </Switch>
    </>
  )
}
