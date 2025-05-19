/* eslint-disable no-undef */
// filepath: c:\Users\harsh\OneDrive\Desktop\Soccer-For-Change-Web\server.js
const path = require('path');
const express = require('express');
const stripe = require('stripe')('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');
const cors = require('cors'); 
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

/*app.get('/', (req, res) => {
  res.send('Hello World!');
}); */

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Create Payment Intent endpoint
app.post('/api/create-payment-intent', async (req, res) => {
  console.log('Received payment intent request:', req.body);
  
  try {
    const { amount, currency = 'usd' } = req.body;
    
    if (!amount) {
      throw new Error('Amount is required');
    }

    console.log('Using Stripe key:', process.env.STRIPE_SECRET_KEY || 'hardcoded key');

    console.log('Creating payment intent with amount:', amount);
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('Payment intent created:', paymentIntent.id);
    
    res.json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id 
    });
  } catch (error) {
    console.error('Server error creating payment intent:', error);
    res.status(500).json({ 
      error: error.message,
      type: error.type,
      code: error.code
    });
  }
});

app.post('/api/save-registration', (req, res) => {
  const registration = req.body;
  const filePath = path.join(__dirname, 'registrations.json');

  let registrations = [];
  try {
    if (fs.existsSync(filePath)) {
      registrations = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    registrations.push(registration);
    fs.writeFileSync(filePath, JSON.stringify(registrations, null, 2));

    // Save to CSV as well
    saveToCSV(registration);

    res.json({ success: true });
    console.log('Registration saved successfully.');
  } catch (err) {
    console.error('Error saving registration:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

function saveToCSV(registration) {
  console.log('saveToCSV called');
  const filePath = path.join(__dirname, 'registrations.csv');
  const header = [
    'Timestamp',
    'Parent First Name',
    'Parent Last Name',
    'Parent Email',
    'Parent Phone',
    'Camp Name',
    'Camp Date',
    'Camp Location',
    'Camp Price',
    'Participants',
    'Camper First Name',
    'Camper Last Name',
    'DOB',
    'Gender',
    'Medical Conditions',
    'Medications',
    'Allergies',
    'Emergency First Name',
    'Emergency Last Name',
    'Emergency Phone'
  ].join(',') + '\n';

  try {
    registration.campers.forEach(camper => {
      const row = [
        registration.timestamp,
        registration.parentInfo.firstName,
        registration.parentInfo.lastName,
        registration.parentInfo.email,
        registration.parentInfo.phone,
        registration.campData.campName,
        registration.campData.campDate,
        registration.campData.campLocation,
        registration.campData.campPrice,
        registration.participants,
        camper.firstName,
        camper.lastName,
        camper.dob,
        camper.gender,
        camper.medicalConditions,
        camper.medications,
        camper.allergies,
        camper.emergencyFirstName,
        camper.emergencyLastName,
        camper.emergencyPhone
      ].map(field => `"${(field || '').toString().replace(/"/g, '""')}"`).join(',') + '\n';

      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, header);
        console.log('CSV header written');
      }
      fs.appendFileSync(filePath, row);
      console.log('CSV row appended');
    });
  } catch (err) {
    console.error('Error writing to CSV:', err);
  }
}

// Serve the main index.html file for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
