// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../types.d.ts" />
import { type NextFunction, type Request, type Response } from 'express'
import prisma from '../modules/db'

export async function getAllProducts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id
      },
      include: {
        products: true
      }
    })

    res.status(200).json({
      data: user?.products.map(({ id, name, createdAt }) => {
        return {
          id,
          name,
          createdAt
        }
      })
    })
  } catch (e) {
    next(e)
  }
}

export async function getProductById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const productFound = await prisma.product.findUnique({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })

    if (productFound == null) {
      res.status(404).json({ error: 'Product not found' })
    } else {
      res.status(200).json({
        data: {
          id: productFound?.id,
          name: productFound?.name,
          createdAt: productFound?.createdAt
        }
      })
    }
  } catch (e) {
    next(e)
  }
}

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const newProduct = await prisma.product.create({
      data: {
        userId: req.user.id,
        name: req.body.name
      }
    })

    res.status(201).json({
      data: {
        id: newProduct.id,
        name: newProduct.name,
        createdAt: newProduct.createdAt
      }
    })
  } catch (e) {
    next(e)
  }
}

export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: req.params.id,
        userId: req.user.id
      },
      data: {
        name: req.body.name
      }
    })

    if (updatedProduct == null) {
      res.status(404).json({ error: 'Product not found' })
    } else {
      res.status(200).json({
        data: {
          id: updatedProduct.id,
          name: updatedProduct.name,
          createdAt: updatedProduct.createdAt
        }
      })
    }
  } catch (e) {
    next(e)
  }
}

export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const productFound = await prisma.product.delete({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })

    if (productFound == null) {
      res.status(404).json({ error: 'Product not found' })
    } else {
      res.status(204).end()
    }
  } catch (e) {
    next(e)
  }
}
