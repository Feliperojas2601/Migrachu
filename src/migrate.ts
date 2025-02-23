import { BaseMigration } from './migrations/base';
import path from 'path';

async function migrate() {
    const migrationName = process.argv[2];
    const direction = process.argv[3] || 'up'; 
    if (!migrationName) {
        console.error('❌ Debes proporcionar un nombre de migración.');
        process.exit(1);
    }
    if (!['up', 'down'].includes(direction)) {
        console.error('❌ La dirección debe ser "up" o "down".');
        process.exit(1);
    }
    try {
        const migrationPath = path.join(__dirname, 'migrations', migrationName);
        const migrationModule = await import(migrationPath);
        if (!migrationModule || !migrationModule[migrationName]) {
            throw new Error(`No se encontró la migración '${migrationName}' en el archivo.`);
        }
        const MigrationClass = migrationModule[migrationName];
        const migrationInstance: BaseMigration = new MigrationClass();
        console.log(`🚀 Ejecutando migración: ${migrationName} (${direction})`);
        if (direction === 'up') {
            await migrationInstance.up();
            console.log(`✅ Migración ${migrationName} aplicada con éxito.`);
        } else {
            await migrationInstance.down();
            console.log(`✅ Migración ${migrationName} revertida con éxito.`);
        }
    } catch (error) {
        console.error(`❌ Error ejecutando la migración ${migrationName} (${direction}):`, error);
        process.exit(1);
    }
}

migrate();
