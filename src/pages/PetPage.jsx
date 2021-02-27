import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

export function PetPage() {
  const [pickedPet, setPickedPet] = useState({
    id: undefined,
    name: '',
    isDead: false,
  })

  // const [petImage, setPetImage] = useState({
  //   image: '',
  //   link: '',
  //   dataType: 'jpeg',
  //   type: 'GET',
  // })

  const [feeding, setFeeding] = useState({})

  const [playtime, setPlaytime] = useState({})

  const [scolding, setScolding] = useState({})

  const { id } = useParams()

  const history = useHistory()

  const apiURL = `https://amandaf-tamagotchi.herokuapp.com/api/pets/${id}`

  // const petAPI = `https://randomfox.ca/images/${id}.jpg`

  // Finding pet by ID
  useEffect(
    async function () {
      const resp = await axios.get(apiURL)

      setPickedPet(resp.data)
    },
    [id]
  )

  // Get pet pictures
  // useEffect(
  //   async function () {
  //     const resp = await axios.get(petAPI)

  //     setPetImage(resp.data)
  //   },
  //   [id]
  // )

  // Play with Pet
  async function playWithPet() {
    const resp = await axios.post(
      `https://amandaf-tamagotchi.herokuapp.com/api/pets/${id}/playtimes`
    )
    setPlaytime(resp.data)
  }

  // Feed Pet
  async function feedPet() {
    const resp = await axios.post(
      `https://amandaf-tamagotchi.herokuapp.com/api/pets/${id}/feedings`
    )
    setFeeding(resp.data)
  }

  // Scold Pet
  async function scoldPet() {
    const resp = await axios.post(
      `https://amandaf-tamagotchi.herokuapp.com/api/pets/${id}/scolding`
    )
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
      {/* <img src={petImage.image}></img> */}
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
