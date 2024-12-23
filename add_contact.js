document.addEventListener('DOMContentLoaded', () => {
    // Get the lead ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const leadId = urlParams.get('leadId');
  
    if (!leadId) {
      alert('Lead ID is missing!');
      window.location.href = 'index.html'; // Redirect back to the main page
      return;
    }
  
    // Handle the form submission
    document.getElementById('contactForm').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const newContact = {
        name: document.getElementById('contact_name').value,
        role: document.getElementById('contact_role').value,
        phone_number: document.getElementById('contact_phone').value,
        email: document.getElementById('contact_email').value,
      };
  
      try {
        const response = await fetch(`http://localhost:3000/api/leads/${leadId}/contacts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newContact),
        });
  
        if (!response.ok) {
          throw new Error('Failed to add contact');
        }
  
        alert('Contact added successfully!');
        document.getElementById('contactForm').reset();
      } catch (err) {
        console.error('Error adding contact:', err);
        alert('An error occurred while adding the contact.');
      }
    });
  });
  