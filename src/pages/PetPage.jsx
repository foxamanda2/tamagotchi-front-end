import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

export function PetPage() {
  const [pickedPet, setPickedPet] = useState({
    id: undefined,
    name: '',
    isDead: false,
  })

  const { id } = useParams()

  const [randomFox] = useState({
    // Need to create a statement if it goes over the amount of images
    image: `https://randomfox.ca/images/${id}.jpg`,
  })

  const [feeding, setFeeding] = useState({})
  const [playtime, setPlaytime] = useState({})
  const [scolding, setScolding] = useState({})

  const history = useHistory()

  const apiURL = `https://amandaf-tamagotchi.herokuapp.com/api/pets/${id}`

  // Finding pet by ID
  const loadPet = async function () {
    const resp = await axios.get(apiURL)

    setPickedPet(resp.data)
  }

  useEffect(loadPet, [id])

  // Play with Pet
  async function playWithPet() {
    const resp = await axios.post(
      `https://amandaf-tamagotchi.herokuapp.com/api/pets/${id}/playtimes`
    )

    loadPet()
    setPlaytime(resp.data)
  }

  // Feed Pet
  async function feedPet() {
    const resp = await axios.post(
      `https://amandaf-tamagotchi.herokuapp.com/api/pets/${id}/feedings`
    )

    loadPet()
    setFeeding(resp.data)
  }

  // Scold Pet
  async function scoldPet() {
    const resp = await axios.post(
      `https://amandaf-tamagotchi.herokuapp.com/api/pets/${id}/scoldings`
    )

    loadPet()
    setScolding(resp.data)
  }

  // Delete Pet
  async function deletePetItem() {
    const resp = await axios.delete(apiURL)

    history.push('/')
  }

  return (
    <>
      <p className="name">{pickedPet.name}</p>
      <div>
        <img src={randomFox.image} />
      </div>
      <p> Happiness: {pickedPet.happinessLevel}</p>
      <p>Hunger: {pickedPet.hungerLevel}</p>
      <p>Birthday: {pickedPet.birthday}</p>
      <p>Last Interacted: {pickedPet.lastInteractedWithDate}</p>

      <div>
        <button className="playtime" onClick={playWithPet}>
          Playtime
        </button>
        <button className="feeding" onClick={feedPet}>
          Feeding
        </button>
        <button className="scolding" onClick={scoldPet}>
          Scolding
        </button>
        <button className="delete" onClick={deletePetItem}>
          Delete
        </button>
      </div>
    </>
  )
}
