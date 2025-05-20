import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./service/firebase";


export const obtenerDatos = async () =>{
    const contactos = await getDocs(collection(db, 'contactos'));
    return contactos.docs.map(doc => ({id: doc.id, ...doc.data()}));
}

export const agregarDatos = async (nombre, direccion) => {
  try {
    await addDoc(collection(db, 'contactos'), {
      nombre: nombre,
      direccion: direccion
    });
    console.log("Documento agregado exitosamente");
  } catch (e) {
    console.error("Error al agregar documento: ", e);
  }
};

export const editarDatos = async (id, nombre, direccion) => {
  const datoRef = doc(db, 'contactos', id); 
  await updateDoc(datoRef, {
    nombre: nombre,
    direccion: direccion,
  });
};

export const eliminarDato =  async(id) => {
    const dato =  doc(db, 'contactos', id);
    await deleteDoc(dato);
};