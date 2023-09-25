import express from "express"
import PointsController from "./controllers/points_controller";
import ItemsController from "./controllers/items_controller";

const routes = express.Router()
const pointsController = new PointsController();
const itemsController = new ItemsController()

routes.get('/items', itemsController.index);
routes.get('/points/:id', pointsController.show)
routes.post('/points', pointsController.create);
 
  export default routes;