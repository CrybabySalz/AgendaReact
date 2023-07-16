import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get('https://raymond-cors-anywhere.up.railway.app/http://www.raydelto.org/agenda.php')
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        console.error('Error consiguiendo contactos:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Contactos</h1>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.nombre} {contact.apellido} - {contact.telefono}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AddContact = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const newContact = {
      nombre,
      apellido,
      telefono
    };

    axios.post('https://raymond-cors-anywhere.up.railway.app/http://www.raydelto.org/agenda.php', newContact)
      .then(response => {
        console.log('Contacto agregado exitosamente:', response.data);
        setNombre('');
        setApellido('');
        setTelefono('');
      })
      .catch(error => {
        console.error('Error agregando contacto:', error);
      });
  };

  return (
    <div>
      <h1>Añadir Contacto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={e => setApellido(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Contactos</Link>
            </li>
            <li>
              <Link to="/agregar">Agregar Contacto</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={ContactList} />
          <Route path="/agregar" component={AddContact} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

