import 'dotenv/config';
import { bootstrap } from './bootstrap';

const port = process.env.PORT || 4000;

console.log('NODE_ENV', process.env.NODE_ENV);

bootstrap().then((app) => {
  app.listen(port);
  console.log(`Server started on http://localhost:${port}`);
});
