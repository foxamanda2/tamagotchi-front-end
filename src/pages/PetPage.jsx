import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

export function PetPage() {
  const [pickedPet, setPickedPet] = useState({
    id: undefined,
    name: '',
    isDead: false,
  })

  const [randomFox, setRandomFox] = useState({
    // This will set it to the correct image until the effect is ran
    // image: `https:\/\/randomfox.ca\/images\/7.jpg`,
    image: '',
  })

  const [feeding, setFeeding] = useState({})
  const [playtime, setPlaytime] = useState({})
  const [scolding, setScolding] = useState({})

  const { id } = useParams()

  const history = useHistory()

  const apiURL = `https://amandaf-tamagotchi.herokuapp.com/api/pets/${id}`

  const petAPI = `https://randomfox.ca/floof/?ref=apilist.fun`

  // Finding pet by ID

  const loadPet = async function () {
    const resp = await axios.get(apiURL)

    setPickedPet(resp.data)
  }

  useEffect(loadPet, [id])

  // api with axios
  useEffect(async function () {
    const resp = await axios.get(petAPI)

    setRandomFox(resp.data)
  }, [])

  // // API pictures
  // useEffect(async function () {
  //   const resp = await fetch(petAPI)

  //   const json = await resp.json()

  //   setRandomFox(json)
  // }, [])

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
      {/* <p className={pickedPet.isDead ? 'isDead' : ''}>{pickedPet.name}</p> */}
      <p className="name">{pickedPet.name}</p>
      <div>
        <img src={randomFox.image} />
      </div>
      <p> Happiness: {pickedPet.happinessLevel}</p>
      <p>Hunger: {pickedPet.hungerLevel}</p>
      <p>Birthday: {pickedPet.birthday}</p>
      <p>Last Interacted: {pickedPet.lastInteractedWithDate}</p>

      <button className="play" onClick={playWithPet}>
        Playtime{' '}
      </button>
      <button className="feed" onClick={feedPet}>
        Feeding
      </button>
      <button className="scold" onClick={scoldPet}>
        {' '}
        Scolding
      </button>
      <button className="delete" onClick={deletePetItem}>
        Delete
      </button>
    </>
  )
}
