

export function Contacts({ contacts, onDeleteContact }) {
  return (
    <ul className="contactList" >
      {contacts.map(contact => (
        <li
          key={contact.id}
          className="added-contact">
          <p
            className="subtitle is-5 added-contact-item">
            {contact.name} {contact.number}</p>
          <button
            className="button is-danger is-light"
            onClick={() => onDeleteContact(contact.id)}
            type="button">Delete</button>
        </li>
      ))}
    </ul>
  )
}