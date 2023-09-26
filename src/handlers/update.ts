import { type NextFunction, type Request, type Response } from 'express'
import prisma from '../modules/db'

/*
 * A função getAllUpdates retorna todas as atualizações de um produto.
 * Os produtos são filtrados pelo id do usuário, que é obtido do token JWT,
 * e as atualizações são incluídas na resposta.
 * As atualizações são mapeadas e retornadas em um array.
 */

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

    res.status(200).json({ data: productsFound.map(({ updates }) => updates) })
  } catch (e) {
    next(e)
  }
}

/*
 * A função getUpdateById retorna uma atualização de um produto.
 * As atualizações são filtradas pelo id recebido no parâmetro da URL,
 * e retornadas na resposta.
 * Caso a atualização não seja encontrada, uma resposta com status 404 é retornada.
 */

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

    if (updateFound == null) {
      res.status(404).json({ error: 'Update not found' })
    } else {
      res.status(200).json({ data: updateFound })
    }
  } catch (e) {
    next(e)
  }
}

/*
 * A função createUpdate cria uma nova atualização de um produto.
 * Os produtos são filtrados pelo id do usuário, que é obtido do token JWT,
 * e também usando o id de produto recebido no corpo da requisição.
 * Caso o produto não seja encontrado, uma resposta com status 404 é retornada.
 */

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

    if (productFound == null) {
      res.status(404).json({ error: 'Product not found' })
    } else {
      const newUpdate = await prisma.update.create({
        data: req.body
      })

      res.status(201).json({ data: newUpdate })
    }
  } catch (e) {
    next(e)
  }
}

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

    if (updatedUpdate == null) {
      res.status(404).json({ error: 'Update not found' })
    } else {
      res.status(200).json({ data: updatedUpdate })
    }
  } catch (e) {
    next(e)
  }
}

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

    if (deletedUpdate == null) {
      res.status(404).json({ error: 'Update not found' })
    } else {
      res.status(204).end()
    }
  } catch (e) {
    next(e)
  }
}
