import express from 'express';
import config from './config/config.js';
import swaggerDocs from './config/swagger.js';

import bookRoutes from './routes/bookRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import userRoutes from './routes/userRoutes.js';


const app = express();
app.use(express.json());

app.use('/api', bookRoutes);
app.use('/api', newsRoutes);
app.use('/api',userRoutes);

swaggerDocs(app, config.port); 

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});
