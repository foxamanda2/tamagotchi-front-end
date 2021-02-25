# Tamagotchi Front End

# P-

- C: Create a new pet
- R: Read pet Details
- U: Update a pet with playing, feeding, and scolding buttons
- D: Delete a pet and redirect to home page

-- An app needs to be created where we can store pets from an API.

# E-

- When you are on a pet page there should be a home button that will bring you back to the home screen.
- There should be a delete button on the pet page that should bring you back to home when deleted.
- Buttons on the pet page should include playing, feeding, scolding. They should update automatically without refreshing page.
- Pets should all show on the first page along with their happiness and hunger levels. The page should automatically reload when these actions happen.
- Pets should be able to be selected and direct to a new page.

# D-

- PetPage needed
  -- Display a single pet that was selected and their info
  --- axios get /api/Pets/{id} to get the single pet

-- Object for playing, feeding, and scolding.
--- axios post /api/Pets/{id}/(activity)

-- Buttons to play, feed, and scold. (JSX clicking)
--- On Click they need to set the objects from above.

-- Should have a delete button.
--- Function that does axiou delete /api/Pets/{id}
--- history.push('/')
--- const history = useHistory()

-- Should have a home.
--- A link to the /

- PetDetails
  -- Get all the pets with axios
  --- Display all the pets and their info

-- Give an option to add a new pet
--- axios post
--- return a form that gives an option to add new pet.
--- Update entire page seamlessly with another axios get

- App
  -- Display all of the pets and add pet by implementing PetDetails

-- Implement Pet page by linking the PetPage
-- Add a show option next to pets in order to display the separate pet pages

-- Delete pet option?

# A-

- PetDetails
  -- [pets, setPets]=useState({})
  -- [newPet,setNewPet]=useState({})

-- useEffect---> variableName= axios get 'Link to get the pets' set.Pet(variableName) \*Make sure to add an empty array

-- Create handler
--- prevent default
--- variable= axios Post (because we are adding a new pet) 'link to post the pets' {
name: newPet (new pet name goes here)
}
-- Make it seamless with another get 'link to post the get'-> setPets (variable.data) setPets('')

** This Should have a return statement**
-- Map pets (add petCode, petDetails) and print out details of the pet that are needed (ex. petDetails.name)
-- form with onSubmit (handler above)
--- Text, placeholder, value (should be newPet), onChange(should contain setNewPet)

- PetPage
  -- [pickedPet,setPickedPet]=useState({})

-- const params=useParams
-- useEffect -- useEffect---> variableName= axios get 'Link to get with id pets/${params.id}' set.Pet(variableName) \*Make sure to add an empty array
