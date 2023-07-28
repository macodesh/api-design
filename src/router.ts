import { type Request, Router, type Response, type NextFunction } from 'express'

import {
  validateCreateUpdateInput,
  validateCreateUpdateStepInput,
  validateProductInput,
  validateUpdateInput,
  validateUpdateStepInput
} from './modules/validations'
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct
} from './handlers/product'
import {
  createUpdate,
  deleteUpdate,
  getAllUpdates,
  getUpdateById,
  updateUpdate
} from './handlers/update'
import { errorHandler } from './modules/errorHandler'

// Importa o módulo Router do Express para criar o roteador.
const router: Router = Router()

/**
 * Products
 */

// Rota para obter todos os produtos.
router.get('/product', (req, res, next) => {
  void getAllProducts(req, res, next)
})

// Rota para criar um novo produto, com validação dos dados de entrada.
router.post(
  '/product',
  validateProductInput,
  (req: Request, res: Response, next: NextFunction) => {
    void createProduct(req, res, next)
  }
)

// Rota para obter um produto pelo seu ID.
router.get('/product/:id', (req, res, next) => {
  void getProductById(req, res, next)
})

// Rota para atualizar um produto pelo seu ID, com validação dos dados de entrada.
router.put(
  '/product/:id',
  validateProductInput,
  (req: Request, res: Response, next: NextFunction) => {
    void updateProduct(req, res, next)
  }
)

// Rota para deletar um produto pelo seu ID.
router.delete('/product/:id', (req, res, next) => {
  void deleteProduct(req, res, next)
})

/**
 * Updates
 */

// Rota para obter todas as atualizações (updates).
router.get('/update', (req, res, next) => {
  void getAllUpdates(req, res, next)
})

// Rota para criar uma nova atualização (update), com validação dos dados de entrada.
router.post(
  '/update',
  validateCreateUpdateInput,
  (req: Request, res: Response, next: NextFunction) => {
    void createUpdate(req, res, next)
  }
)

// Rota para obter uma atualização (update) pelo seu ID.
router.get('/update/:id', (req, res, next) => {
  void getUpdateById(req, res, next)
})

// Rota para atualizar uma atualização (update) pelo seu ID, com validação dos dados de entrada.
router.put(
  '/update/:id',
  validateUpdateInput,
  (req: Request, res: Response, next: NextFunction) => {
    void updateUpdate(req, res, next)
  }
)

// Rota para deletar uma atualização (update) pelo seu ID.
router.delete('/update/:id', (req, res, next) => {
  void deleteUpdate(req, res, next)
})

/**
 * Update Steps
 */

// Rota para obter todos os passos de uma atualização (update).
router.get('/updatestep', (req, res, next) => {})

// Rota para criar um novo passo de atualização (update step), com validação dos dados de entrada.
router.post(
  '/updatestep',
  validateCreateUpdateStepInput,
  (req: Request, res: Response, next: NextFunction) => {}
)

// Rota para obter um passo de atualização (update step) pelo seu ID.
router.get('/updatestep/:id', (req, res, next) => {})

// Rota para atualizar um passo de atualização (update step) pelo seu ID, com validação dos dados de entrada.
router.put(
  '/updatestep/:id',
  validateUpdateStepInput,
  (req: Request, res: Response, next: NextFunction) => {}
)

// Rota para deletar um passo de atualização (update step) pelo seu ID.
router.delete('/updatestep/:id', (req, res, next) => {})

// Middleware para tratamento de erros.
router.use(errorHandler)

// Exporta o roteador configurado para uso em outros módulos.
export { router }
