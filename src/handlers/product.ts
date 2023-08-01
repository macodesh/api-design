// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../types.d.ts" />
import { type NextFunction, type Request, type Response } from 'express'
import { prisma } from '../modules/db'

// Obtém todos os produtos pertencentes a um usuário específico.
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

    // Retorna os produtos do usuário em formato JSON.
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
    // Encaminha o erro para o middleware de tratamento de erros.
    next(e)
  }
}

// Obtém um produto específico pelo seu ID, desde que pertença ao usuário logado.
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

    // Verifica se o produto foi encontrado e retorna-o em formato JSON.
    if (productFound == null) {
      res.status(404).json({ message: 'Product not found' })
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
    // Encaminha o erro para o middleware de tratamento de erros.
    next(e)
  }
}

// Cria um novo produto associado ao usuário logado.
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

    // Retorna o novo produto criado em formato JSON.
    res.status(201).json({
      data: {
        id: newProduct.id,
        name: newProduct.name,
        createdAt: newProduct.createdAt
      }
    })
  } catch (e) {
    // Encaminha o erro para o middleware de tratamento de erros.
    next(e)
  }
}

// Atualiza um produto específico pelo seu ID, desde que pertença ao usuário logado.
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

    // Verifica se o produto foi atualizado com sucesso e retorna-o em formato JSON.
    if (updatedProduct == null) {
      res.status(404).json({ message: 'Product not found' })
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
    // Encaminha o erro para o middleware de tratamento de erros.
    next(e)
  }
}

// Deleta um produto específico pelo seu ID, desde que pertença ao usuário logado.
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

    // Verifica se o produto foi encontrado e deletado com sucesso.
    if (productFound == null) {
      res.status(404).json({ message: 'Product not found' })
    } else {
      // Retorna uma resposta com status 204 (No Content) para indicar que o produto foi deletado com sucesso.
      res.status(204).end()
    }
  } catch (e) {
    // Encaminha o erro para o middleware de tratamento de erros.
    next(e)
  }
}
