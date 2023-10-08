import Notiflix from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import React, { Component } from 'react';


export class PhonebookItem extends Component {
  state = {
    name: '',
    number: '',
  };

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, number } = this.state;

    if (this.props.contacts.some((contact) => contact.name === name)) {
      Notiflix.Notify.warning(`A contact named "${name}" already exists.`);
    } else {
      const newContact = {
        name: name,
        number: number,
        id: nanoid(),
      };

      this.props.onAddContact(newContact);

      this.setState({
        name: '',
        number: '',
      });
    }
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} >
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
          onChange={this.onInputChange}
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
          onChange={this.onInputChange}
        />
        <button className="button is-primary" type="submit" onClick={this.handleSubmit}>
          Add contact
        </button>
      </form>

    );
  }
}