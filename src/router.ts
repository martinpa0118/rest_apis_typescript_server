import { Router } from 'express'
import {body, param} from 'express-validator'
import { createProduct, deleteProduct, getProductos, getProductosById, updateAvailability, updateProduct } from './handlres/producto'
import { handleInputErros } from './middleware'

const router = Router()
/**
 * @swagger
 * components:
 *      schemas:
 *          Producto:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo de 42 pulgadas
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  disponible:
 *                      type: boolean
 *                      description: The product availability
 *                      example: true
 * 
 */

/**
 * @swagger
 * /api/productos:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Productos
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Seccesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Producto'
 * 
 */

router.get('/', getProductos)

/**
 * @swagger
 * /api/productos/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Productos
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path      
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Producto'
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Bad Request - Invalid ID
 *
 */

router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErros,
    getProductosById
)

/**
 * @swagger
 * /api/productos:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Productos
 *      description: Returns a new record in the database
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo de 42 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Producto'
 *          400:
 *              description: Bad Request - invalid input data
 *
 */


router.post('/',

    //Validacion
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),

        
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0).withMessage('El precio no es valido'),
    handleInputErros,
    createProduct

)

/**
 * @swagger
 * /api/productos/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Productos
 *      description: Returns the updated product
 *      parameters:
 *            - in: path      
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo de 42 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Producto'
 *                  
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input data
 *          404:
 *              description: Product Not Found
 */

router.put('/:id', 
        //Validacion
        param('id').isInt().withMessage('ID no valido'),
        body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0).withMessage('El precio no es valido'),
    body('disponible')
        .isBoolean().withMessage('Valor para disponibilidad no valido'),
    
        handleInputErros,
    updateProduct
)

/**
 * @swagger
 * /api/productos/{id}:
 *  patch:
 *      summary: Update Product availability
 *      tags:
 *          - Productos
 *      description: The ID of the product to retrieve
 *      parameters:
 *            - in: path      
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Producto'
 *                  
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 *  
 *      
 */

router.patch('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErros,
    updateAvailability
)
/**
 * @swagger
 * /api/productos/{id}:
 *  delete:
 *      summary: Delete a product by a given ID
 *      tags:
 *          - Productos
 *      description: Return a confirmation message
 *      parameters:
 *            - in: path      
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Producto Eliminado'

 *                  
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 *  
 *      
 */
router.delete('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErros,
    deleteProduct
)

export default router

