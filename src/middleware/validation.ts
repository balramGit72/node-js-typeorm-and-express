import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const createUserValidationRules = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required'),
  // Other validation rules for other fields...
];



export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };