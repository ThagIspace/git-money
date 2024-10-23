exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    if (!title || !category || !date) {
        return res.status(400).json({ message: 'All fields except description are required!' });
    }
    if (amount <= 0 || !Number.isFinite(amount)) {
        return res.status(400).json({ message: 'Amount must be a positive number!' });
    }

    const income = new IncomeSchema({
        title,
        amount,
        category,
        date,
        ...(description && { description }),
    });

    try {
        await income.save();
        res.status(200).json(income);
    } catch (error) {
        console.error('Error saving income:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
