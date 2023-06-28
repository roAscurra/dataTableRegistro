 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
 import { getDatabase, ref, push, update, get, set, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
 import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyAl9ykuf5dTd-PqvbAziwI8kHKYpoxvm6M",
   authDomain: "auth-b1cc8.firebaseapp.com",
   projectId: "auth-b1cc8",
   storageBucket: "auth-b1cc8.appspot.com",
   messagingSenderId: "969609438622",
   appId: "1:969609438622:web:68329fc25ad159f950a28f",
   measurementId: "G-39J1H4HTWP"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getDatabase(app);
 const auth = getAuth(app);

 export const leerDatosUsuarios = () => {
    try {
      const usuariosRef = ref(db, 'Usuarios');
  
      get(usuariosRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const usuariosData = snapshot.val();
  
            Object.keys(usuariosData).forEach(async (key) => {
              const user = usuariosData[key];
              const email = user.email;
              const Nombre = user.Nombre;
              const Apellido = user.Apellido;
              const Nacimiento = user.Nacimiento;
              const Dni = user.Dni;
              const Celular = user.Celular;
              const Contraseña = user.Contraseña;
              const Fecha = user.Fecha;
              let verificado = user.Verificado;
  
              // Verificar el estado de verificación
              if (verificado === false) {
                try {
                  const userCredential = await signInWithEmailAndPassword(getAuth(), email, Contraseña);
                  const currentUser = userCredential.user;
                  if (currentUser.emailVerified) {
                    verificado = true;
                    // Actualizar el estado de verificación en la base de datos
                    await update(ref(db, `Usuarios/${key}`), { Verificado: true });
                    console.log(`Estado de verificación actualizado para el usuario ${Nombre}`);
                  }
                } catch (error) {
                  console.log(`Error al verificar el estado de verificación para el usuario ${Nombre}:`, error);
                }
              }
  
              console.log(`Nombre: ${Nombre}, Correo: ${email}, Verificado: ${verificado}`);
            });
          } else {
            console.log('No se encontraron datos en la base de datos');
          }
        })
        .catch((error) => {
          console.log('Error al leer los datos de la base de datos:', error);
        });
    } catch (error) {
      console.log('Error al leer los datos de la base de datos:', error);
    }
  };
  
  
  