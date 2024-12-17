// import {Table, Column, Model, DataType, Default} from 'sequelize-typescript'

// @Table({
//     tableName: 'productos'
// })

// class Productos extends Model{
//     @Column({
//         type: DataType.STRING(100)
//     })
//     @Default('')
//     name: string
//     @Column({
//         type: DataType.FLOAT(6,2)
//     })
//     price: number
//     @Column({
//         type: DataType.BOOLEAN
//     })
//     disponible: boolean

// }
// export default Productos

import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';

@Table({
  tableName: 'productos', // Define el nombre de la tabla
  timestamps: false,      // Si no usas createdAt y updatedAt
})
class Productos extends Model {
  @Column({
    type: DataType.STRING(100), // Define el tipo y longitud
    allowNull: false,           // Ajusta si debe ser requerido
    defaultValue: '',           // Configura un valor por defecto
  })
  declare name: string;

  @Column({
    type: DataType.FLOAT, // Precisión y escala no se manejan aquí
    allowNull: false,
  })
  declare price: number;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,         // Indica que no debe ser nulo
    defaultValue: true,       // Define un valor por defecto
  })
  declare disponible: boolean;
}

export default Productos;
