const express = require('express');
const router = express.Router();
const db = require('./db');

// Get all leads
router.get('/leads', (req, res) => {
  const query = 'SELECT * FROM leads';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
});

// Add a new lead
router.post('/leads', (req, res) => {
  const { name, address, contact_number, status, assigned_kam } = req.body;
  const query = 'INSERT INTO leads (name, address, contact_number, status, assigned_kam) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, address, contact_number, status, assigned_kam], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, message: 'Lead added successfully' });
  });
});

// Update a lead
router.put('/leads/:id', (req, res) => {
  const { id } = req.params;
  const { name, address, contact_number, status, assigned_kam } = req.body;
  const query = 'UPDATE leads SET name = ?, address = ?, contact_number = ?, status = ?, assigned_kam = ? WHERE id = ?';
  db.query(query, [name, address, contact_number, status, assigned_kam, id], (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ message: 'Lead updated successfully' });
  });
});

// Delete a lead
router.delete('/leads/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM leads WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ message: 'Lead deleted successfully' });
  });
});

// Add an interaction
router.post('/interactions', (req, res) => {
  const { lead_id, date, type, notes, follow_up_required } = req.body;
  const query = 'INSERT INTO interactions (lead_id, date, type, notes, follow_up_required) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [lead_id, date, type, notes, follow_up_required], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, message: 'Interaction logged successfully' });
  });
});

// Get recent interactions
router.get('/interactions/recent', (req, res) => {
  const query = 'SELECT * FROM interactions ORDER BY date DESC LIMIT 10';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
});

// Search leads
router.get('/leads/search', (req, res) => {
  const { query } = req.query; // e.g., /leads/search?query=RestaurantName
  const searchQuery = 'SELECT * FROM leads WHERE name LIKE ?';
  db.query(searchQuery, [`%${query}%`], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
});
router.post('/leads', (req, res) => {
    console.log('Received POST request:', req.body);
    const { name, address, contact_number, status, assigned_kam } = req.body;
    const query = 'INSERT INTO leads (name, address, contact_number, status, assigned_kam) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, address, contact_number, status, assigned_kam], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send(err);
      }
      console.log('Lead added successfully:', result);
      res.status(201).json({ id: result.insertId, message: 'Lead added successfully' });
    });
  });
  

  // Delete a lead by ID
router.delete('/leads/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM leads WHERE id = ?';
  
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error deleting lead:', err);
        return res.status(500).send(err);
      }
  
      console.log('Lead deleted successfully:', result);
      res.status(200).json({ message: 'Lead deleted successfully' });
    });
  });

  // Get all contacts for a specific lead
router.get('/leads/:leadId/contacts', (req, res) => {
    const { leadId } = req.params;
    const query = 'SELECT * FROM contacts WHERE lead_id = ?';
    db.query(query, [leadId], (err, results) => {
      if (err) {
        console.error('Error fetching contacts:', err);
        return res.status(500).send(err);
      }
      res.status(200).json(results);
    });
  });
  
  // Add a new contact to a lead
  router.post('/leads/:leadId/contacts', (req, res) => {
    const { leadId } = req.params;
    const { name, role, phone_number, email } = req.body;
    const query = 'INSERT INTO contacts (lead_id, name, role, phone_number, email) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [leadId, name, role, phone_number, email], (err, result) => {
      if (err) {
        console.error('Error adding contact:', err);
        return res.status(500).send(err);
      }
      res.status(201).json({ id: result.insertId, message: 'Contact added successfully' });
    });
  });
  
  // Delete a contact
  router.delete('/contacts/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM contacts WHERE id = ?';
    db.query(query, [id], (err) => {
      if (err) {
        console.error('Error deleting contact:', err);
        return res.status(500).send(err);
      }
      res.status(200).json({ message: 'Contact deleted successfully' });
    });
  });
  
module.exports = router;
