/**
 *  run server  class
 */
import App from './app';
import DB from './database';
const app = new App()
DB();
app.start()