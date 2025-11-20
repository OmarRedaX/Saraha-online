import connectDB from "./DB/connection.js"
import authController from "./modules/auth/auth.controller.js"
import userController from "./modules/user/user.controller.js"
import messageController from "./modules/message/message.controller.js"
import { globalErrorHandler } from "./utils/error/error.js"
import cors from 'cors'


const bootstrap = (app, express) => {

    app.use(cors())
    
    // convert incoming data to json
    app.use(express.json())
    
    // application routes
    app.get('/', (req, res , next) => {
        return res.status(200).json({message: "Welcome in node.js project powered by express and ES6"})
    })

    app.use('/auth', authController)
    app.use('/user', userController)
    app.use('/message', messageController)

    app.all('/*splat', (req, res) => {
        return res.status(404).json({message: "Route not found"})
    })

    // Global Error Handler
    app.use(globalErrorHandler)

    // Connect to DataBase
    connectDB()

}

export default bootstrap