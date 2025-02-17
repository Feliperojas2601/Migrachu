import path from 'path';
import fs from 'fs';
import { sequelize } from './sequelize';

(async () => {
  try {
    console.log('Setting up...');
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    const modelsDir = path.join(__dirname, '..', 'models');
    if (!fs.existsSync(modelsDir)) {
      fs.mkdirSync(modelsDir, { recursive: true });
      console.log(`Directory created: ${modelsDir}`);
    }
    const tables = await sequelize.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
    );
    console.log('Tables:', tables.map((table: any) => table[0]));
    for (const table of tables) {
      const tableName = (table as any)[0];
      const [attributes] = await sequelize.query(
        `SELECT 
          c.column_name, 
          c.data_type, 
          EXISTS (
            SELECT 1 
            FROM information_schema.key_column_usage k 
            WHERE k.table_name = c.table_name 
              AND k.column_name = c.column_name 
              AND k.constraint_name IN (
                SELECT tc.constraint_name 
                FROM information_schema.table_constraints tc 
                WHERE tc.table_name = c.table_name 
                  AND tc.constraint_type = 'PRIMARY KEY'
              )
          ) AS is_primary_key
        FROM information_schema.columns c 
        WHERE c.table_name = '${tableName}';`
      );
      const validAttributes = attributes.filter((attr: any) => attr.column_name && attr.data_type);
      console.log(`Attributes for table ${tableName}:`, validAttributes);
      const attributeDefinitions = validAttributes
        .map((attr: any) => 
          `  ${attr.column_name}: {
            type: DataTypes.${mapDataType(attr.data_type)},
            ${attr.is_primary_key ? 'primaryKey: true,' : ''}
          }`
        )
        .join(',\n');
      const modelName = tableName.charAt(0).toUpperCase() + tableName.slice(1);
      const modelContent = `
        import { Model, DataTypes } from '@sequelize/core';
        import { sequelize } from '../config/sequelize';

        class ${modelName} extends Model {}

        ${modelName}.init({
        ${attributeDefinitions}
        }, {
          sequelize,
          modelName: '${tableName}',
          tableName: '${tableName}',
          timestamps: false,
        });

        export { ${modelName} };
      `;
      const modelPath = path.join(modelsDir, `${tableName}.ts`);
      fs.writeFileSync(modelPath, modelContent.trim());
      console.log(`Model file created: ${modelPath}`);
    }
    console.log('Setup completed.');
    process.exit(0);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
})();

function mapDataType(sqlType: string): string {
  const typeMap: { [key: string]: string } = {
    integer: 'INTEGER',
    varchar: 'STRING',
    text: 'TEXT',
    boolean: 'BOOLEAN',
    timestamp: 'DATE',
    date: 'DATEONLY',
    float: 'FLOAT',
    double: 'DOUBLE',
    numeric: 'DECIMAL',
    "timestamp without time zone": 'DATE',
  };
  return typeMap[sqlType] || 'STRING';
}