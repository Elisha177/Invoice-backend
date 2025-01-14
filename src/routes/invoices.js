const express = require("express")

const Invoice = require('../models/invoice')
const moment = require('moment');

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { invoiceNumber, clientName, date, amount, status } = req.body;

        // Parse the date from DD-MM-YYYY to ISO format
        const parsedDate = moment(date, "DD-MM-YYYY", true); // Strict parsing
        if (!parsedDate.isValid()) {
            return res.status(400).json({ error: "Invalid date format. Use DD-MM-YYYY." });
        }

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


// Get All Invoices
router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Invoice
router.put('/:id', async (req, res) => {
    //const {id} = req.params;
    try {
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(invoice);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Invoice
router.delete('/:id', async (req, res) => {
    try {
        await Invoice.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Invoice deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;