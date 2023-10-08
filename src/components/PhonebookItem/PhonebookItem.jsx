import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';

export const PhonebookItem = ({ contacts, onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (contacts.some((contact) => contact.name === name)) {
      Notiflix.Notify.warning(`A contact named "${name}" already exists.`);
    } else {
      const newContact = {
        name,
        number,
        id: nanoid(),
      };

      onAddContact(newContact);

      setName('');
      setNumber('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="subtitle is-1">Phonebook</h2>

      <label className="label">Name</label>
      <input
        placeholder="Your name"
        className="input is-success"
        type="text"
        name="name"
        maxLength="20"
        required
        value={name}
        onChange={onInputChange}
      />
      <label className="label">Number</label>
      <input
        placeholder="+380"
        className="input is-success"
        type="number"
        name="number"
        maxLength="20"
        required
        value={number}
        onChange={onInputChange}
      />
      <button className="button is-primary" type="submit">
        Add contact
      </button>
    </form>
  );
};
