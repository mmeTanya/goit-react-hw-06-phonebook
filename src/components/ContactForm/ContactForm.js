import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../../redux/contacts/contacts-actions';
import { getVisibleContacts } from '../../redux/contacts/contacts-selectors';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import s from './ContactForm.module.css';

function ContactForm() {
  const contacts = useSelector(getVisibleContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (contacts.some(contact => contact.name === name)) {
      return Notify.info(`${name} is already in contacts`, {
        timeout: 11000,
      });
    }

    dispatch(actions.addContact(name, number));
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.form__field}>
        <label className={s.form__label} htmlFor="name">
          Name
        </label>
        <input
          className={s.form__input}
          type="text"
          name="name"
          id="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </div>
      <div className={s.form__field}>
        <label className={s.form__label} htmlFor="number">
          Number
        </label>
        <input
          className={s.form__input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          id="number"
          value={number}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className={s.form__btn}>
        Add contact
      </button>
    </form>
  );
}

export default ContactForm;
