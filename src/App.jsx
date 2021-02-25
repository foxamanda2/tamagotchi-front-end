import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useParams } from 'react-router-dom'
import axios from 'axios'

export function App() {
  const [pet, setPet] = useState({})

  const [newPet, setNewPet] = useState('')

  const [feeding, setFeeding] = useState({ id: undefined, text: '' })

  const [playtime, setPlaytime] = useState({})

  const [scolding, setScolding] = useState({})

  // const params = useParams()

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

  // Get the list of pets
  useEffect(async () => {
    const resp = await axios.get(
      `https://amandaf-tamagotchi.herokuapp.com/api/pets`
    )
    setPet(resp.data)
  }, [])

// Refresh List of Pets
  const refreshTodoResponse = await axios.get('https://amandaf-tamagotchi.herokuapp.com/api/pets')setPet(refreshTodoResponse.data)

  let petItems = Object.entries(pet).map(([petCode, petDetails]) => {
    return (
      <li key={petDetails.id}>
        {' '}
        {petDetails.name} Hunger:{petDetails.hungerLevel} Happiness:
        {petDetails.happinessLevel}
      </li>
    )
  })

  async function handleCreatePetItem(event) {
    event.preventDefault()
    const response = await axios.post(
      'https://amandaf-tamagotchi.herokuapp.com/api/pets',
      {
        name: newPet,
      }
    )
    const refreshPetResponse = await axios.get('https://amandaf-tamagotchi.herokuapp.com/api/pets')
    setPet(refreshPetResponse.data)
    setPet('')
  }



  return (
    <>
      <header>
        <h1>Welcome to my SPA</h1>
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
        <nav>
          <ul>
            <li>{petItems}</li>
            <li>
              <Link to="/">Go Home</Link>
            </li>
            <li>
              <Link to="/1">Page 1</Link>
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
        <Route exact path="/1">
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
