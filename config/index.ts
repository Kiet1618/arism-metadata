import * as dotenv from 'dotenv'

const isProduction = process.env.NODE_ENV === 'production'
dotenv.config({ path: isProduction ? '.env' : '.env.local' })

const config = {
    host: process.env.HOST,
    port: process.env.PORT,
    database: {
        mongoUri: process.env.MONGO_URI,
    },
}

export default () => config
