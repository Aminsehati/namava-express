import express from 'express'
const app = express();
import cors from 'cors'
import routes from './routes/index'
import database from './config/database'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())
database()



routes(app);

app.listen(4000, () => {
    console.log('running server on port 4000')
})