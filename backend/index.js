const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Estilista = require('./models/Estilista');
const Cliente = require('./models/Cliente');
const Cita = require('./models/Cita');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('Falta MONGO_URI. Configura la conexión a MongoDB en backend/.env.');
  process.exit(1);
}

async function inicializarDatosBase() {
  const countEstilistas = await Estilista.countDocuments();
  if (countEstilistas === 0) {
    await Estilista.create([
      { nombre: 'Sofía Martínez', especialidad: 'Corte y Color' },
      { nombre: 'Carlos Gómez', especialidad: 'Barbería y Estilismo' }
    ]);
    console.log('Estilistas de prueba creados.');
  }
}

// --- RUTAS DE ESTILISTAS ---
app.get('/api/estilistas', async (req, res) => {
  try {
    const estilistas = await Estilista.find();
    res.json(estilistas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estilistas' });
  }
});

// --- RUTAS DE CLIENTES ---
app.get('/api/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

app.post('/api/clientes', async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    await nuevoCliente.save();
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(400).json({ error: 'Error al registrar cliente' });
  }
});

// --- RUTAS DE CITAS (CON VALIDACIÓN DE CRUCE DE HORARIOS) ---
app.get('/api/citas', async (req, res) => {
  try {
    const { fecha } = req.query;
    let filtro = fecha ? { fecha } : {};
    // Traemos las citas haciendo populate para ver los datos del cliente y estilista directamente
    const citas = await Cita.find(filtro)
      .populate('clienteId')
      .populate('estilistaId');
    res.json(citas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las citas' });
  }
});

app.post('/api/citas', async (req, res) => {
  try {
    const { estilistaId, fecha, horaInicio, horaFin, clienteId } = req.body;

    // Validación anti-cruces en MongoDB:
    // Buscamos si ya existe una cita para el mismo estilista en la misma fecha 
    // donde los rangos de hora se solapen: (InicioA < FinB) y (FinA > InicioB)
    const citaConflictiva = await Cita.findOne({
      estilistaId: estilistaId,
      fecha: fecha,
      $and: [
        { horaInicio: { $lt: horaFin } },
        { horaFin: { $gt: horaInicio } }
      ]
    });

    if (citaConflictiva) {
      return res.status(400).json({ 
        error: 'Conflicto de horario: El estilista ya tiene una cita asignada en ese rango de tiempo.' 
      });
    }

    const nuevaCita = new Cita({ clienteId, estilistaId, fecha, horaInicio, horaFin });
    await nuevaCita.save();
    
    res.status(201).json({ mensaje: 'Cita agendada con éxito', cita: nuevaCita });
  } catch (error) {
    res.status(400).json({ error: 'Error al agendar la cita' });
  }
});

async function iniciarServidor() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado exitosamente a MongoDB');
    await inicializarDatosBase();
    app.listen(PORT, () => {
      console.log(`Backend corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo conectar o inicializar MongoDB:', error.message);
    process.exitCode = 1;
  }
}

iniciarServidor();