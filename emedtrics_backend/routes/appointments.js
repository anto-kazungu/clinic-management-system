const express = require('express');
const router = express.Router();
const db = require('../db'); // Database import

// Add an Appointment
router.post('/', (req, res) => {
    const { patient_name, provider_name, appointment_date, appointment_time, reason } = req.body;
    const sql = 'INSERT INTO appointments (patient_name, provider_name, appointment_date, appointment_time, reason) VALUES (?, ?, ?, ?, ?)';

    db.query(sql, [patient_name, provider_name, appointment_date, appointment_time, reason], (err, result) => {
        if (err) {
            console.error('Error inserting appointment:', err); // Log detailed error
            return res.status(500).json({ error: 'Failed to book appointment', details: err.message });
        }
        res.status(201).json({ message: 'Appointment booked successfully', id: result.insertId });
    });
});

// Get All Appointments
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM appointments';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// Get an Appointment by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const query = `SELECT * FROM appointments WHERE appointment_id = ?`;

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error fetching appointment:', err);
            return res.status(500).json({ message: 'Error fetching appointment', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json(result[0]);
    });
});

// Update an Appointment
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { patient_name, provider_name, date, time } = req.body;

    const query = `
        UPDATE appointments
        SET patient_name = ?, provider_name = ?, appointment_date = ?, appointment_time = ?
        WHERE appointment_id = ?
    `;

    db.query(query, [patient_name, provider_name, date, time, id], (err, result) => {
        if (err) {
            console.error('Error updating appointment:', err);
            return res.status(500).json({ message: 'Error updating appointment', error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment updated successfully' });
    });
});

// Delete an Appointment
router.delete('/:id', (req, res) => {
    const { id } = req.params; // Extract id from URL

    if (!id) {
        return res.status(400).json({ message: 'Appointment ID is required' });
    }

    const query = `DELETE FROM appointments WHERE appointment_id = ?`;

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting appointment:', err);
            return res.status(500).json({ message: 'Error deleting appointment' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully' });
    });
});

module.exports = router;
