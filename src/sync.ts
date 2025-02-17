import { Orders } from './models/orders';
import { Users } from './models/users';

(async () => {
  try {
    console.log('Syncing...');
    // Here we sync the model we want, comment the models you don't need to sync and uncomment the ones you modify
    await Users.sync({ alter: true });
    await Orders.sync({ alter: true });
    // await UnwantedModel.sync({ alter: true });
    console.log('Sync finished.');
    process.exit(0);  
  } catch (error) {
    console.error('Error syncing:', error);
    process.exit(1);
  }
})();