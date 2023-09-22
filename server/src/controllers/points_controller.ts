import knex from "../database/connection";
import { Request, Response } from "express";

class PointsController {
    async create(request: any, response:any) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
          } = request.body;
      
          const trx = await knex.transaction();
          const point = {
            image: 'image fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
          }
          const IsertedIds = await trx('points').insert(point)
          const point_id = IsertedIds[0];
      
          const pointItems = items.map((item_id: Number) => {
            return {
              item_id,
              point_id,
            }
          })
          await trx('point_items').insert(pointItems)
          return response.json({
            id: point_id,
            ...point,
          })
    }
}

export default PointsController;