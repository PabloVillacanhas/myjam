const { body, validationResult } = require('express-validator');

exports.validateTrack = [
	body('id').notEmpty().withMessage('id is required'),
	body('name').notEmpty().withMessage('name is required'),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(422).json({ errors: errors.array() });
		next();
	},
];