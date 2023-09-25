import express from "express"
import PointsController from "./controllers/points_controller";
import ItemsController from "./controllers/items_controller";

const routes = express.Router()
const pointsController = new PointsController();
const itemsController = new ItemsController()

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)

 
  export default routes;