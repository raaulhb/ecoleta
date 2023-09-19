import express from "express"

const routes = express.Router()

routes.get('/users', (request:any, response:any) => {
    return response.json({message: 'Hello world'})
  })

  export default routes;