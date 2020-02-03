import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Submit from './components/Submit'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setNewMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.map(person => person.name.toLowerCase())
      .includes(newName.toLowerCase())

    if (nameExists) {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (result) {
        const personToUpdate = persons.find(person => 
          person.name.toLowerCase() === newName.toLowerCase()
        )
        updatePerson(personToUpdate)
      }

    } else {
      const person = {
        name: newName,
        number: newNumber
      }

      personService.create(person).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
      setNewMessageAndTimeout(`Added ${person.name}`)
    }
    setNewNumber('')
    setNewName('')
  }

  const updatePerson = personToUpdate => {
    const updatedPerson = {...personToUpdate, name: newName, number: newNumber}
    personService.update(personToUpdate.id, updatedPerson).then(response => {
      const updatedPersons = persons.filter(person => person.name !== personToUpdate.name).concat(updatedPerson)
      setPersons(updatedPersons)
    })
    setNewMessageAndTimeout(`Updated ${personToUpdate.name}`)
  }

  const deleteById = (id) => {
    const personName = persons.find(n => n.id === id).name
    const result = window.confirm(`Delete ${personName} ?`)

    if (result) {
      personService.deletePersonById(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        setNewMessageAndTimeout(`Deleted ${personName}`)
      })
    }
  }

  const setNewMessageAndTimeout = (messageToShow) => {
    console.log({messageToShow})
    setNewMessage(messageToShow)
    setTimeout(() => {
      setNewMessage(null)
    }, 5000)
  }

  const filterForPersonNames = persons.filter(person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <Submit 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <ul>
        {filterForPersonNames.map(person => 
          <Person 
            key={person.id}
            person={person}
            deletePerson={() => deleteById(person.id)}
          />
        )}
      </ul>
    </div>
  )
}

export default App