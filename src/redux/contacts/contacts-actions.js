import shortid from 'shortid';
import { createAction } from '@reduxjs/toolkit';

const addContact = createAction('Contacts/add', (name, number) => ({
  payload: {
    id: shortid.generate(),
    name,
    number,
  },
}));

const deleteContact = createAction('Contacts/delete');

const changeFilter = createAction('Contacts/changeFilter');

const actions = { addContact, deleteContact, changeFilter };
export default actions;
