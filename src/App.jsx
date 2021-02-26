import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { PetDetails } from './pages/PetDetails'

export function PetPage() {
  const [pickedPet, setPickedPet] = useState({
    id: undefined,
    name: '',
    isDead: false,
  })

  const [feeding, setFeeding] = useState({})

  const [playtime, setPlaytime] = useState({})

  const [scolding, setScolding] = useState({})

  const params = useParams()

  const history = useHistory()

  // Finding pet by ID
  useEffect(
    async function () {
      const resp = await axios.get(
        `https://amandaf-tamagotchi.herokuapp.com/api/pets/${params.id}`
      )

      setPickedPet(resp.data)
    },
    [params.id]
  )

  // Play with Pet
  async function playWithPet() {
    const resp = await axios.post(
      `https://amandaf-tamagotchi.herokuapp.com/api/pets/${params.id}/playtimes`
    )
    setPlaytime(resp.data)
  }

  // Feed Pet
  async function feedPet() {
    const resp = await axios.post(
      `https://amandaf-tamagotchi.herokuapp.com/api/pets/${params.id}/feedings`
    )
    setFeeding(resp.data)
  }

  // Scold Pet
  async function scoldPet() {
    const resp = await axios.post(
      `https://amandaf-tamagotchi.herokuapp.com/api/pets/${params.id}/scolding`
    )
    setScolding(resp.data)
  }

  // Delete Pet
  async function deletePetItem() {
    const resp = await axios.delete(
      `https://amandaf-tamagotchi.herokuapp.com/api/pets/${params.id}}`
    )
    history.push('/')
  }

  return (
    <>
      <p className={pickedPet.isDead ? 'idDead' : ''}>{pickedPet.name}</p>
      <p> Happiness: {pickedPet.happinessLevel}</p>
      <p>Hunger: {pickedPet.hungerLevel}</p>
      <p>Birthday: {pickedPet.birthday}</p>
      <p>Last Interacted: {pickedPet.lastInteractedWithDate}</p>
      {/* <p>Playtimes: {playtime}</p>
      <p>Feeding: {feeding}</p>
      <p>Scolding: {scolding}</p> */}

      <button onClick={playWithPet}>Playtime: </button>
      <button onClick={feedPet}>Feeding</button>
      <button onClick={scoldPet}> Scolding</button>
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
          <ul>
            <li>
              <Link to="/">Go Home</Link>
            </li>
            {/* <li>
              <Link to={`/pets/${id}`}>Show</Link>
            </li> */}
            <li>
              <Link to="/2">Page 2</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route exact path="/">
          Home
          <PetDetails />
        </Route>
        <Route exact path="/pets/:id">
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
