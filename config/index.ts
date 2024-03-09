import * as dotenv from 'dotenv'
dotenv.config()

const config = {
    host: process.env.HOST,
    port: process.env.PORT,
    database: {
        mongoUri: process.env.MONGO_URI,
    },
}



export default () => (config)
