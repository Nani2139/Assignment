document.addEventListener('DOMContentLoaded', () => {
    fetchLeads();
  
    // Handle lead form submission
    document.getElementById('leadForm').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const newLead = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        contact_number: document.getElementById('contact_number').value,
        status: document.getElementById('status').value,
        assigned_kam: document.getElementById('assigned_kam').value,
      };
  
      try {
        const response = await fetch('http://localhost:3000/api/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newLead),
        });
  
        if (!response.ok) {
          throw new Error('Failed to add lead');
        }
  
        alert('Lead added successfully!');
        document.getElementById('leadForm').reset();
        fetchLeads();
      } catch (err) {
        console.error('Error adding lead:', err);
        alert('An error occurred while adding the lead.');
      }
    });
  });
  
  // Fetch all leads and display them
  async function fetchLeads() {
    try {
      const response = await fetch('http://localhost:3000/api/leads');
      const leads = await response.json();
  
      let leadTable = `
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Assigned KAM</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
      `;
  
      leads.forEach(lead => {
        leadTable += `
          <tr>
            <td>${lead.id}</td>
            <td>${lead.name}</td>
            <td>${lead.address}</td>
            <td>${lead.contact_number}</td>
            <td>${lead.status}</td>
            <td>${lead.assigned_kam}</td>
            <td>
              <button class="btn btn-info btn-sm" onclick="fetchContacts(${lead.id})">View Contacts</button>
              <a href="add_contact.html?leadId=${lead.id}" class="btn btn-success btn-sm">Add Contact</a>
              <button class="btn btn-danger btn-sm" onclick="deleteLead(${lead.id})">Delete Lead</button>
            </td>
          </tr>
        `;
      });
  
      leadTable += `</tbody></table>`;
      document.getElementById('lead-table-container').innerHTML = leadTable;
    } catch (err) {
      console.error('Error fetching leads:', err);
    }
  }
  
  // Fetch contacts for a specific lead
  async function fetchContacts(leadId) {
    try {
      const response = await fetch(`http://localhost:3000/api/leads/${leadId}/contacts`);
      const contacts = await response.json();
  
      if (contacts.length === 0) {
        alert(`No contacts available for Lead ID: ${leadId}`);
        return;
      }
  
      let contactTable = `
        <h2>Contacts for Lead ID: ${leadId}</h2>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
      `;
  
      contacts.forEach(contact => {
        contactTable += `
          <tr>
            <td>${contact.name}</td>
            <td>${contact.role}</td>
            <td>${contact.phone_number}</td>
            <td>${contact.email}</td>
            <td>
              <button class="btn btn-danger btn-sm" onclick="deleteContact(${contact.id}, ${leadId})">Delete</button>
            </td>
          </tr>
        `;
      });
  
      contactTable += `</tbody></table>`;
      document.getElementById('contact-section').innerHTML = `
        ${contactTable}
        <a href="add_contact.html?leadId=${leadId}" class="btn btn-success">Add Contact</a>
      `;
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  }
  
  // Delete a lead
  async function deleteLead(leadId) {
    if (confirm('Are you sure you want to delete this lead?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/leads/${leadId}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete lead');
        }
  
        alert('Lead deleted successfully!');
        fetchLeads();
      } catch (err) {
        console.error('Error deleting lead:', err);
        alert('An error occurred while deleting the lead.');
      }
    }
  }
  
  // Delete a contact
  async function deleteContact(contactId, leadId) {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/contacts/${contactId}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete contact');
        }
  
        alert('Contact deleted successfully!');
        fetchContacts(leadId);
      } catch (err) {
        console.error('Error deleting contact:', err);
        alert('An error occurred while deleting the contact.');
      }
    }
  }
  
  // Attach global functions to window
  window.deleteLead = deleteLead;
  window.fetchContacts = fetchContacts;
  window.deleteContact = deleteContact;
  