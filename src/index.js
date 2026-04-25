const express = require('express');
const sequelize = require('./config/db');
const control = require('./controllers/compraController');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/productos', control.listar);
app.post('/productos', control.agregar);
app.put('/productos/:id', control.actualizar);
app.delete('/productos/:id', control.eliminar);
app.post('/comprar', control.confirmarOrden);

sequelize.sync({ force: false }).then(() => {
    console.log('✅ Base de datos sincronizada');
    app.listen(3000, () => console.log('🚀 Sistema en: http://localhost:3000'));
});
