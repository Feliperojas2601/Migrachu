import { Model, DataTypes } from '@sequelize/core';
        import { sequelize } from '../config/sequelize';

        class Orders extends Model {}

        Orders.init({
            id: DataTypes.INTEGER,
  user_id: DataTypes.INTEGER,
  total_amount: DataTypes.DECIMAL,
  created_at: DataTypes.DATE
        }, {
          sequelize,
          modelName: 'orders',
          tableName: 'orders',
          timestamps: false,
        });

        export { Orders };