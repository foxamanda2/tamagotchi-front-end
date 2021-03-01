import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export function PetDetails() {
  const [pets, setPets] = useState({})

  const [newPet, setNewPet] = useState('')

  // Get the list of pets
  async function loadAllPets() {
    const resp = await axios.get(
      `https://amandaf-tamagotchi.herokuapp.com/api/pets`
    )
    setPets(resp.data)
  }

  // Loading all Pets
  useEffect(loadAllPets, [])

  // Create new Pets & Append
  async function handleCreatePetItem(event) {
    event.preventDefault()
    const resp = await axios.post(
      'https://amandaf-tamagotchi.herokuapp.com/api/pets',
      {
        name: newPet,
      }
    )
    loadAllPets()
    setNewPet('')
  }

  return (
    <>
      <p className="homeHeader">Pets in our palace</p>
      <ul>
        {Object.entries(pets).map(([petCode, petDetails]) => {
          return (
            <li key={petDetails.id}>
              {' '}
              {petDetails.name}- Hunger:{petDetails.hungerLevel} Happiness:
              {petDetails.happinessLevel}
              <Link to={`/pets/${petDetails.id}`} className="show">
                {' '}
                Show
              </Link>
            </li>
          )
        })}
        <form onSubmit={handleCreatePetItem}>
          <input
            type="text"
            placeholder="Name your new pet!"
            value={newPet}
            onChange={function (event) {
              setNewPet(event.target.value)
            }}
          />
        </form>
      </ul>
    </>
  )
}
