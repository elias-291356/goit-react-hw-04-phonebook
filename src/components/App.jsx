import 'bulma/css/bulma.css';
import React, { Component } from 'react';



import { Filter } from './Filter/Filter';
import { Contacts } from './Contacts/Contacts';
import { PhonebookItem } from './PhonebookItem/PhonebookItem';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',

  };

  componentDidMount() {
    const stringifiedContacts = localStorage.getItem('key');
    const parsedContacts = JSON.parse(stringifiedContacts) ?? [];
    this.setState({
      contacts: parsedContacts
    });
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('key', stringifiedContacts);
    }
  }


  handleAddContact = (newContact) => {
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
    }));
  };



  onDeleteContact = (id) => {
    this.setState({
      contacts: this.state.contacts.filter((contact) => contact.id !== id),
    });
  };

  onFilterContact = (event) => {
    const inputFilterValue = event.target.value;
    this.setState({ filter: inputFilterValue });
  };

  render() {
    const filtered = this.state.contacts.filter((contact) => {
      return (
        contact.name
          .toLowerCase()
          .includes(this.state.filter.trim().toLowerCase()) ||
        contact.number.includes(this.state.filter)
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
        <div className='box '>
          <PhonebookItem
            name={this.state.name}
            number={this.state.number}
            onAddContact={this.handleAddContact}
            contacts={this.state.contacts}
          />
          <Filter
            onChange={this.onFilterContact}
            filterList={filtered} />
          <Contacts
            contacts={filtered}
            onDeleteContact={this.onDeleteContact} />
        </div >
      </div >
    );
  }
}