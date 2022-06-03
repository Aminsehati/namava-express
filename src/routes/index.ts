import { Express } from 'express'
import AuthRoutes from './Auth'
import subscriptionRoutes from './subscription'
import userRoutes from './user'
function Routes(app:Express) {
    app.use("/api/v1/Auth",AuthRoutes);
    app.use('/api/v1/subscription',subscriptionRoutes);
    app.use('/api/v1/account/user',userRoutes);
}
export default Routes