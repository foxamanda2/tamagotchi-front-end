import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useParams } from 'react-router-dom'
import axios from 'axios'

export function PetDetails() {
  const [pets, setPets] = useState({})

  const [newPet, setNewPet] = useState('')

  // Get the list of pets
  useEffect(async () => {
    const resp = await axios.get(
      `https://amandaf-tamagotchi.herokuapp.com/api/pets`
    )
    setPets(resp.data)
  }, [])

  async function handleCreatePetItem(event) {
    event.preventDefault()
    const response = await axios.post(
      'https://amandaf-tamagotchi.herokuapp.com/api/pets',
      {
        name: newPet,
      }
    )
    const refreshPetResponse = await axios.get(
      'https://amandaf-tamagotchi.herokuapp.com/api/pets'
    )
    setPets(refreshPetResponse.data)
    setPets('')
  }

  return (
    <>
      {Object.entries(pets).map(([petCode, petDetails]) => {
        return (
          <li key={petDetails.id}>
            {' '}
            {petDetails.name} Hunger:{petDetails.hungerLevel} Happiness:
            {petDetails.happinessLevel}
          </li>
        )
      })}
      <form onSubmit={handleCreatePetItem}>
        <input
          type="text"
          placeholder="What is your Pets Name?"
          value={newPet}
          onChange={function (event) {
            setNewPet(event.target.value)
          }}
        />
      </form>
    </>
  )
}
export function PetPage() {
  const [pickedPet, setPickedPet] = useState({})

  const params = useParams()

  useEffect(async () => {
    const resp = await axios.get(
      `https://amandaf-tamagotchi.herokuapp.com/api/pets/${params.id}`
    )
    setPickedPet(resp.data)
  }, [])

  return (
    <>
      <h1>
        {pickedPet.name}: {pickedPet.happinessLevel}{' '}
      </h1>
      <button>Playtime</button>
      <button>Feeding</button>
      <button>Scolding</button>
    </>
  )
}

export function App() {
  const [feeding, setFeeding] = useState({})

  const [playtime, setPlaytime] = useState({})

  const [scolding, setScolding] = useState({})

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
              <PetDetails />
            </li>
            <li>
              <Link to="/">Go Home</Link>
            </li>
            <li>
              <Link to="/pets/id">Page 1</Link>
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
