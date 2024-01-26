const express=  require('express')
const router= express.Router()
const db =require('../../database/configure')

 router.use(express.json())

 router.get('/', async (req, res) => {
    const waitForUpdates = () => {
      return new Promise((resolve) => {
     
        db.query('SELECT * FROM registro', (err, results) => {
          if (err) {
            console.error('Error al traer a los usuarios', err);
            res.status(500).send('Error en la consulta de la base de datos');
          } else {
            resolve(results);
          }
        });
      });
    };
  
    // Iniciar el long polling
    const handleLongPolling = async () => {
      const updates = await waitForUpdates();
      res.json(updates);
    };
  
   
    const timeoutId = setTimeout(() => {
      res.status(200).json([]); 
    }, 30000);
  
 
    handleLongPolling();
  
    
    res.on('finish', () => {
      clearTimeout(timeoutId);
    });
  });
  

router.post('/', (req, res) => {
    const { usuario, correo, contraseña } = req.body;
  
    if (!usuario || !correo || !contraseña) {
      return res.status(400).send('Todos los campos son obligatorios para el registro');
    }
  
    db.query(
      'INSERT INTO registro (usuario, correo, contraseña) VALUES (?,?,?)',
      [usuario, correo, contraseña],
      (err, results) => {
        if (err) {
          console.error('Error al insertar usuarios', err);
          res.status(500).send('Error al hacer la consulta a la base de datos');
        } else {
          const id_usuario = results.insertId; 
          db.query('SELECT * FROM registro WHERE id_usuario=?', [id_usuario], (err, user) => {
            if (err) {
              console.error('Error al obtener el usuario recién insertado', err);
              res.status(500).send('Error al obtener el usuario recién insertado');
            } else {
              const usuarioInsertado = user[0];
              console.log('Datos enviados correctamente');
              res.status(201).json(usuarioInsertado);
            }
          });
        }
      }
    );
  });

router.delete('/:id', (req,res)=>{
    const id_usuario =req.params.id

    db.query('DELETE FROM registro WHERE id_usuario=?', [id_usuario], (err, results)=>{
        if (err) {
            console.error("error al borrar el registro")
            res.status(500).send("error al borrar el registro")
        }else{
            console.log("datos borrados correctamente")
            res.status(200).send("registro borrado exitosamente")
        }
    })
})

    

module.exports= router