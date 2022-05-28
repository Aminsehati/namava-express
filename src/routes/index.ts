import { Express } from 'express'
import AuthRoutes from './Auth'
function Routes(app:Express) {
    app.use("/api/v1/Auth",AuthRoutes)
}
export default Routes