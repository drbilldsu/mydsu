const moment = require('moment')
const Expense = require('../models/expenses')

module.exports = {
	listExpenses: (req, res) => {
		Expense.find(req.query)
			.then(expenses => res.json(expenses))
	},
	getExpense: (req, res) => {
		Expense.findById(req.params.id)
			.then(expense => res.json(expense))
	},
	createExpense: (req, res) => {
		Expense.create({
			description: req.body.description,
			amount: req.body.amount,
			quantity: req.body.quantity
		})
			.then(expense => res.status(201).json(expense))
			.catch(e => {
				switch(e.name) {
					case 'ValidationError':
						res.status(422).send()
						break
					default:
						res.status(500).send()
				}
			})
	},
	updateExpense: (req, res) => {
		Expense.findByIdAndUpdate(req.params.id, {
			description: req.body.description,
			amount: req.body.amount,
			quantity: req.body.quantity
		},
		{ new: true }
		)
			.then(expense => res.json(expense))
	},
	deleteExpense: (req, res) => {
		Expense.findByIdAndRemove(req.params.id)
			.then(() => res.status(204).send())
	},
}














