import 'bulma/css/bulma.css';
import React, { useEffect, useState } from 'react';
import { Filter } from './Filter/Filter';
import { Contacts } from './Contacts/Contacts';
import { PhonebookItem } from './PhonebookItem/PhonebookItem';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('key')) ?? [])
  // const [contacts, setContacts] = useState([]);
  // useEffect(() => {
  //   const stringifiedContacts = localStorage.getItem('key');
  //   const parsedContacts = JSON.parse(stringifiedContacts) ?? [];
  //   setContacts(parsedContacts);
  // }, []);

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('key', stringifiedContacts);
  }, [contacts]);

  const handleAddContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const onDeleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const onFilterContact = (event) => {
    const inputFilterValue = event.target.value;
    setFilter(inputFilterValue);
  };

  const filtered = contacts.filter((contact) => {
    return (
      contact.name.toLowerCase().includes(filter.trim().toLowerCase()) ||
      contact.number.includes(filter)
    );
  });

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <div className="box">
        <PhonebookItem
          onAddContact={handleAddContact}
          contacts={contacts}
        />
        <Filter
          onChange={onFilterContact}
          filterList={filtered} />
        <Contacts
          contacts={filtered}
          onDeleteContact={onDeleteContact} />
      </div>
    </div>
  );
};