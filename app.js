const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// POST endpoint to handle form submission and calculate BMI
app.post('/calculate', (req, res) => {
  const height = parseFloat(req.body.height);
  const weight = parseFloat(req.body.weight);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    return res.status(400).send('Invalid input. Height and weight must be positive numbers.');
  }

  const bmi = calculateBMI(weight, height);
  res.send(`Your BMI is: ${bmi}`);
});

// Function to calculate BMI
function calculateBMI(weight, height) {
  return (weight / (height * height)).toFixed(2);
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

