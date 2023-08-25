import { type NextFunction, type Request, type Response } from 'express'
import { body, validationResult } from 'express-validator'

/*
 * Validação de entradas
 * A função validationResponse é um middleware que verifica se há erros de validação
 * e retorna uma resposta com status 400 e o primeiro erro encontrado.
 * Se não houver erros, a função next() é chamada para continuar o fluxo da requisição.
 */

function validationResponse(
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg
    })
  } else next()
}

// As validações abaixo são passadas como um array de middlewares para as rotas correspondentes.

export const validateUserInput = [
  body('username')
    .not()
    .isEmpty()
    .withMessage('Username is required')
    .isString()
    .withMessage('Username must be a string')
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters'),

  body('password')
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 8, max: 50 })
    .withMessage('Password must be between 8 and 50 characters'),

  validationResponse
]

export const validateProductInput = [
  body('name')
    .not()
    .isEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters'),

  validationResponse
]

export const validateUpdateInput = [
  body('title')
    .optional()
    .isString()
    .withMessage('Title must be a string')
    .isLength({ min: 3, max: 50 })
    .withMessage('Title must be between 3 and 50 characters'),

  body('body')
    .optional()
    .isString()
    .withMessage('Body must be a string')
    .isLength({ min: 3, max: 200 })
    .withMessage('Body must be between 3 and 200 characters'),

  body('status')
    .optional()
    .isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED'])
    .withMessage('Status must be IN_PROGRESS, SHIPPED, or DEPRECATED'),

  body('version')
    .optional()
    .isString()
    .withMessage('Version must be a string')
    .isLength({ max: 10 })
    .withMessage('Version must be under 10 characters'),

  validationResponse
]

export const validateCreateUpdateInput = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .isLength({ min: 3, max: 50 })
    .withMessage('Title must be between 3 and 50 characters'),

  body('body')
    .not()
    .isEmpty()
    .withMessage('Body is required')
    .isString()
    .withMessage('Body must be a string')
    .isLength({ min: 3, max: 200 })
    .withMessage('Body must be between 3 and 200 characters'),

  body('version')
    .optional()
    .isString()
    .withMessage('Version must be a string')
    .isLength({ max: 10 })
    .withMessage('Version must be under 10 characters'),

  body('productId')
    .not()
    .isEmpty()
    .withMessage('productId is required')
    .isString()
    .withMessage('productId must be a string'),

  validationResponse
]

export const validateUpdateStepInput = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .isLength({ min: 3, max: 200 })
    .withMessage('Description must be between 3 and 200 characters'),

  validationResponse
]

export const validateCreateUpdateStepInput = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters'),

  body('description')
    .not()
    .isEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string')
    .isLength({ min: 3, max: 200 })
    .withMessage('Description must be between 3 and 200 characters'),

  body('updateId')
    .not()
    .isEmpty()
    .withMessage('UpdateId is required')
    .isString()
    .withMessage('UpdateId must be a string'),

  validationResponse
]
