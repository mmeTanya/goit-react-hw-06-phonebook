import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../../redux/contacts/contacts-actions';
import { getVisibleContacts } from '../../redux/contacts/contacts-selectors';
import Contact from '../Contact';
import s from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(getVisibleContacts);
  const dispatch = useDispatch();

  const onDeleteContact = id => dispatch(actions.deleteContact(id));

  return (
    <ul className={s.contact__list}>
      {contacts.map(contact => (
        <li key={contact.id} className={s.contact__item}>
          <Contact contact={contact} onDeleteContact={() => onDeleteContact(contact.id)} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
