const express = require("express");
const Invoice = require('../models/invoice');
const moment = require('moment');
const auth = require('../middleware/auth');
const router = express.Router();

// Function to generate a unique invoice number
async function generateUniqueInvoiceNumber() {
    let invoiceNumber;
    let isUnique = false;

    while (!isUnique) {
        // Generate a random invoice number (you can customize the format)
        invoiceNumber = 'INV-' + Math.floor(100000 + Math.random() * 900000); // Example: INV-123456

        // Check if the invoice number already exists in the database
        const existingInvoice = await Invoice.findOne({ invoiceNumber });

        if (!existingInvoice) {
            isUnique = true;
        }
    }

    return invoiceNumber;
}


// Create Invoice (Protected)
router.post("/", auth, async (req, res) => {  // Add auth middleware here
    try {
        const { clientName, date, amount, status } = req.body;

        // Parse the date from DD-MM-YYYY to ISO format
        const parsedDate = moment(date, "DD-MM-YYYY", true); // Strict parsing
        if (!parsedDate.isValid()) {
            return res.status(400).json({ error: "Invalid date format. Use DD-MM-YYYY." });
        }

        // Generate a unique invoice number
        const invoiceNumber = await generateUniqueInvoiceNumber();

        const invoice = new Invoice({
            invoiceNumber,
            clientName,
            date: parsedDate.toDate(), // Convert to JavaScript Date object
            amount,
            status,
        });

        await invoice.save();
        res.status(201).json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get All Invoices (Protected)
router.get('/', auth, async (req, res) => { //Add auth middleware here
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Invoice (Protected)
router.put('/:id', auth, async (req, res) => { //Add auth middleware here
    try {
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(invoice);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Invoice (Protected)
router.delete('/:id', auth, async (req, res) => { //Add auth middleware here
    try {
        await Invoice.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Invoice deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;