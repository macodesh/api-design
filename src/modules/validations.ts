import { type NextFunction, type Request, type Response } from 'express'
import { body, validationResult } from 'express-validator'

// Função de validação de resposta geral para ser usada ao final das validações individuais.
function validationResponse(
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined {
  const errors = validationResult(req)

  // Verifica se houve erros de validação.
  if (!errors.isEmpty()) {
    // Retorna uma resposta de erro com status 400 e a primeira mensagem de erro encontrada.
    return res.status(400).json({
      message: errors.array()[0].msg
    })
  } else next()
}

// Validações para a rota '/product'.
export const validateProductInput = [
  body('name')
    .not()
    .isEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters'),

  // Chama a função de validação geral 'validationResponse' ao final das validações individuais.
  validationResponse
]

// Validações para a rota '/update'.
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

  // Chama a função de validação geral 'validationResponse' ao final das validações individuais.
  validationResponse
]

// Validações para a rota '/updatestep'.
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

  // Chama a função de validação geral 'validationResponse' ao final das validações individuais.
  validationResponse
]

// Validações para a rota '/updatestep'.
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

  // Chama a função de validação geral 'validationResponse' ao final das validações individuais.
  validationResponse
]