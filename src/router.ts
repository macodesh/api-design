import { type NextFunction, type Request, type Response, Router } from 'express'
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
import errorHandler from './modules/error/errorHandler'

const router: Router = Router()

/**
 * Products
 */

router.get('/product', (req, res, next) => {
  void getAllProducts(req, res, next)
})

router.post(
  '/product',
  validateProductInput,
  (req: Request, res: Response, next: NextFunction) => {
    void createProduct(req, res, next)
  }
)

router.get('/product/:id', (req, res, next) => {
  void getProductById(req, res, next)
})

router.put(
  '/product/:id',
  validateProductInput,
  (req: Request, res: Response, next: NextFunction) => {
    void updateProduct(req, res, next)
  }
)

router.delete('/product/:id', (req, res, next) => {
  void deleteProduct(req, res, next)
})

/**
 * Updates
 */

router.get('/update', (req, res, next) => {
  void getAllUpdates(req, res, next)
})

router.post(
  '/update',
  validateCreateUpdateInput,
  (req: Request, res: Response, next: NextFunction) => {
    void createUpdate(req, res, next)
  }
)

router.get('/update/:id', (req, res, next) => {
  void getUpdateById(req, res, next)
})

router.put(
  '/update/:id',
  validateUpdateInput,
  (req: Request, res: Response, next: NextFunction) => {
    void updateUpdate(req, res, next)
  }
)

router.delete('/update/:id', (req, res, next) => {
  void deleteUpdate(req, res, next)
})

/**
 * Update Steps
 */

router.get('/updatestep', (req, res, next) => {})

router.post(
  '/updatestep',
  validateCreateUpdateStepInput,
  (req: Request, res: Response, next: NextFunction) => {}
)

router.get('/updatestep/:id', (req, res, next) => {})

router.put(
  '/updatestep/:id',
  validateUpdateStepInput,
  (req: Request, res: Response, next: NextFunction) => {}
)

router.delete('/updatestep/:id', (req, res, next) => {})

router.use(errorHandler)

export default router
