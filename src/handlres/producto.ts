import {Request, Response} from 'express'

import Productos from '../models/Productos.model'

export const getProductos = async (req: Request, res: Response) => {
    try {
        const productos = await Productos.findAll()
            order:[
                ['id', 'DESC']
        ]
        res.json({data: productos})
    } catch (error) {
        console.log(error)
    }
}
export const getProductosById = async (req: Request, res: Response) => {
    try {
    
    const {id} = req.params
    const producto = await Productos.findByPk(id)
    
    if(!producto){
        res.status(404).json({
            error: 'Producto No Encontrado'
        })
        return
    }

    res.json({data: producto})
    } catch (error) {
        console.log(error)
    }
}
export const createProduct = async (req: Request,res: Response) => {

    try {
        const producto = await Productos.create(req.body)
        res.status(201).json({data: producto})
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (req: Request,res: Response) => {
    const {id} = req.params
    const producto = await Productos.findByPk(id)
    
    if(!producto){
        res.status(404).json({
            error: 'Producto No Encontrado'
        })
        return
    }

    //Actualizar
    await producto.update(req.body)
    await producto.save()

    res.json({data: producto})
}
export const updateAvailability = async (req: Request,res: Response) => {
    const {id} = req.params
    const producto = await Productos.findByPk(id)
    
    if(!producto){
        res.status(404).json({
            error: 'Producto No Encontrado'
        })
        return
    }

    //Actualizar
    producto.disponible = !producto.dataValues.disponible
    await producto.save()
    res.json({data: producto})
}

export const deleteProduct = async (req: Request,res: Response) => {
    const {id} = req.params
    const producto = await Productos.findByPk(id)
    
    if(!producto){
        res.status(404).json({
            error: 'Producto No Encontrado'
        })
        return
    }
    await producto.destroy()
    res.json({data: 'Producto Eliminado'})
}