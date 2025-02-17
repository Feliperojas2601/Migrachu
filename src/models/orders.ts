import { Model, DataTypes } from '@sequelize/core';
        import { sequelize } from '../config/sequelize';

        class Orders extends Model {}

        Orders.init({
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
          },
  user_id: {
            type: DataTypes.INTEGER,
            
          },
  total_amount: {
            type: DataTypes.DECIMAL,
            
          },
  created_at: {
            type: DataTypes.STRING,
            
          }
        }, {
          sequelize,
          modelName: 'orders',
          tableName: 'orders',
          timestamps: false,
        });

        export { Orders };