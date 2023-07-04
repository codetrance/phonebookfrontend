// import logo from './logo.svg';
// ID is missing in the persons, in my code, on the how to do the update
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
// const Phonebook = require("./models/entry");

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [q, setQ] = useState("");

  const baseUrl = "/api/entries/";

  const hook = () => {
    console.log("effect");
    axios.get(baseUrl).then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data); // console.log(response.data)
    });
  };

  useEffect(hook, []);
  console.log("render", persons.length, "persons");
  console.log(persons);

  const addName = (event) => {
    event.preventDefault();

    if (
      persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      //even "some" be used instead of "find"
      return alert(`${newName} is already added to phonebook`);
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      axios.post(baseUrl, nameObject).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });

      const some = persons;
      console.log(some);
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleQSearch = (event) => {
    console.log(event.target.value);
    setQ(event.target.value);
  };

  const Person = (props) => {
    const { person, setPersons } = props;

    const handle = () => {
      const message = `Delete ${person.name}`;

      if (window.confirm(message)) {
        axios.delete(`${baseUrl}${person.id}`).then((response) => {
          // setPersons(person.concat(response.data));
          setPersons(persons.filter((p) => p.id !== person.id));
        });
      }
    };

    return (
      <tr>
        <td className="delete">{person.name}</td>
        <td className="delete">{person.number}</td>

        <td>
          <button onClick={handle}>Delete!</button>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <p>
        filter shown with :
        <input
          type="text"
          placeholder={"Search Character"}
          value={q}
          onChange={handleQSearch}
        />
      </p>
      <h2>Add a new</h2>

      <form onSubmit={addName}>
        <div>
          <div>
            name: <input value={newName} onChange={handleNameChange} />
          </div>

          <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </div>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <tbody>
        {persons
          .filter(
            (person) =>
              person.name.toString().toLowerCase().indexOf(q.toLowerCase()) >
                -1 || person.number.indexOf(q) > -1
          )
          .map((person) => (
            <p className="error">
              <Person key={person.id} person={person} setPersons={setPersons} />
            </p>
          ))}
      </tbody>
    </div>
  );
};

export default App;
