import React, { useEffect, useState } from 'react'
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

    // This is not refreshing response
    const refreshPetResponse = await axios.get(
      'https://amandaf-tamagotchi.herokuapp.com/api/pets'
    )
    setPets(refreshPetResponse.data)
    setPets('')
  }

  return (
    <>
      <ul>
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
      </ul>
    </>
  )
}
