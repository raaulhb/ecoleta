import knex from "../database/connection";
import { Request, Response } from "express";

class PointsController {

    async show(request:any, response:any) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point) {
            return response.status(400).json({message: 'Point not found'});
        }

        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title')

        // console.log('point', point)
        // console.log('items ',items)
        
        return response.json({ point, items })
    }

    async create(request: any, response:any) {
      const trx = await knex.transaction();
      try {
        
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

        //   console.log('point create', point)
          trx.commit();

          return response.json({
            id: point_id,
            ...point,
          })
        } catch (error) {
            trx.rollback();
            return response.status(400).json({error: error })
          }
        }
    }

export default PointsController;

// create(req, res) {
//   try {
//     const {...} = req.body;
//     const trx = await connection.transaction();

//     await trx(...).insert(...);

//     trx.commit();
//     return res.json(...);

//   } catch (error) {
//     trx.rollback();
//     return rest.status(400).json(...)
//   }
// } 