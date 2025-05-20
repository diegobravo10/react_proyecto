import { useState, useEffect } from "react";
import './holaups.css';

import {obtenerDatos,agregarDatos,editarDatos,eliminarDato} from "./servicios";

function HolaUps({ texto }) {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [lista, setLista] = useState([]);
  const [indiceSeleccionado, setIndiceSeleccionado] = useState(null);

  useEffect(() => {
  const cargarDatos = async () => {
    try {
      const datosFirestore = await obtenerDatos();
      setLista(datosFirestore);
    } catch (error) {
      console.error("Error al obtener datos desde Firestore:", error);
    }
  };

  cargarDatos();
}, []);

  const guardar = async () => {
    if (indiceSeleccionado !== null) {
      const nuevaLista = [...lista];
      nuevaLista[indiceSeleccionado] = { nombre, direccion };
      setLista(nuevaLista);
     // localStorage.setItem("datos", JSON.stringify(nuevaLista));
      await editarDatos(lista[indiceSeleccionado].id, nombre, direccion);
      setIndiceSeleccionado(null);
    } else {
      const nuevaLista = [...lista, { nombre, direccion }];
      setLista(nuevaLista);
      //localStorage.setItem("datos", JSON.stringify(nuevaLista));
      await agregarDatos(nombre, direccion);
    }

    setNombre('');
    setDireccion('');
  };

  const editar = (index) => {
      const persona = lista[index];
      setNombre(persona.nombre);
      setDireccion(persona.direccion);
      setIndiceSeleccionado(index)
    
  };

  const eliminar = async( indice ) => {
    if (indice !== null) {
      const nuevaLista = lista.filter((_, i) => i !== indice);
      setLista(nuevaLista);
      await eliminarDato(lista[indice].id);
      //localStorage.setItem("datos", JSON.stringify(nuevaLista));
      setIndiceSeleccionado(null);
      setNombre('');
      setDireccion('');
    }
  };

  return (
    <div className="App">
      <h2>{texto} - Ecuador</h2>

      <form>
        <label htmlFor="textNombre">Nombre</label>
        <input
          id="textNombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label htmlFor="textDireccion">Dirección</label>
        <input
          id="textDireccion"
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />

        <button type="button" onClick={guardar}>
          {indiceSeleccionado !== null ? "Actualizar" : "Guardar"}
        </button>
      </form>
      <br />
      <table id="tabla-personas" border='1'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((persona, index) => (
            <tr>
              <td>{persona.nombre}</td>
              <td>{persona.direccion}</td>
              <td>
                <div id="botones">
                  <button type="button" onClick={() => editar(index)}>Editar</button>
                  <button type="button" onClick={() => eliminar(index)}>Eliminar</button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
}

export default HolaUps;
