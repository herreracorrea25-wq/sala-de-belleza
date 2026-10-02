const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  estilistaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Estilista', required: true },
  fecha: { type: String, required: true },       // Formato 'YYYY-MM-DD'
  horaInicio: { type: String, required: true },  // Formato 'HH:mm'
  horaFin: { type: String, required: true }      // Formato 'HH:mm'
});

module.exports = mongoose.model('Cita', citaSchema);