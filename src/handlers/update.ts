import { type NextFunction, type Request, type Response } from 'express'
import { prisma } from '../modules/db'

// Obtém todas as atualizações associadas aos produtos pertencentes ao usuário logado.
export async function getAllUpdates(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const productsFound = await prisma.product.findMany({
      where: {
        userId: req.user.id
      },
      include: {
        updates: true
      }
    })

    // Retorna todas as atualizações em formato JSON.
    res.status(200).json({ data: productsFound.map(({ updates }) => updates) })
  } catch (e) {
    // Encaminha o erro para o middleware de tratamento de erros.
    next(e)
  }
}

// Obtém uma atualização específica pelo seu ID.
export async function getUpdateById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const updateFound = await prisma.update.findFirst({
      where: {
        id: req.params.id
      }
    })

    // Verifica se a atualização foi encontrada e retorna-a em formato JSON.
    if (updateFound == null) {
      res.status(404).json({ message: 'Update not found' })
    } else {
      res.status(200).json({ data: updateFound })
    }
  } catch (e) {
    // Encaminha o erro para o middleware de tratamento de erros.
    next(e)
  }
}

// Cria uma nova atualização associada a um produto existente, desde que pertença ao usuário logado.
export async function createUpdate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const productFound = await prisma.product.findUnique({
      where: {
        id: req.body.productId,
        userId: req.user.id
      }
    })

    // Verifica se o produto foi encontrado e retorna uma mensagem de erro caso não tenha sido.
    if (productFound == null) {
      res.status(404).json({ message: 'Product not found' })
    } else {
      const newUpdate = await prisma.update.create({
        data: req.body
      })

      // Retorna a nova atualização criada em formato JSON.
      res.status(201).json({ data: newUpdate })
    }
  } catch (e) {
    // Encaminha o erro para o middleware de tratamento de erros.
    next(e)
  }
}

// Atualiza uma atualização específica pelo seu ID.
export async function updateUpdate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const updatedUpdate = await prisma.update.update({
      where: {
        id: req.params.id
      },
      data: req.body
    })

    // Verifica se a atualização foi atualizada com sucesso e retorna-a em formato JSON.
    if (updatedUpdate == null) {
      res.status(404).json({ message: 'Update not found' })
    } else {
      res.status(200).json({ data: updatedUpdate })
    }
  } catch (e) {
    // Encaminha o erro para o middleware de tratamento de erros.
    next(e)
  }
}

// Deleta uma atualização específica pelo seu ID.
export async function deleteUpdate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const deletedUpdate = await prisma.update.delete({
      where: {
        id: req.params.id
      }
    })

    // Verifica se a atualização foi encontrada e deletada com sucesso.
    if (deletedUpdate == null) {
      res.status(404).json({ message: 'Update not found' })
    } else {
      // Retorna uma resposta com status 204 (No Content) para indicar que a atualização foi deletada com sucesso.
      res.status(204).end()
    }
  } catch (e) {
    // Encaminha o erro para o middleware de tratamento de erros.
    next(e)
  }
}
