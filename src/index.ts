import express from 'express';
import { initAPIs } from './routes/api';

const app = express();
const port = 3000;

// app.get('/', (req, res) => {
//     res.send('Welcome to demo Two-Factor Authentication (2FA) api');
// });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

initAPIs(app);

app.listen(port, () => {
    return console.log('Server is listening on port ' + port);
});
