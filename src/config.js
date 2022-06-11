require('dotenv').config()
console.log(process.env)

const appKey={
    key:process.env.REACT_APP_API_KEY
}

const appToken={
    token:process.env.REACT_APP_API_TOKEN
}

export { appKey, appToken }