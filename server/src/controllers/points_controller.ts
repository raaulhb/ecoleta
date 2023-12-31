import knex from "../database/connection";
import { Request, Response } from "express";

class PointsController { 

    async index(request:any, response:any) {
        const { city, uf, items } = request.query;

        const ParsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()))

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', ParsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');

        const serializedPoints = points.map((point:any) => {
          return {
              ...point,
              image_url: `http://192.168.1.222:3333/uploads/${point.image}`,
          };
      });

      return response.json(serializedPoints);
  } 

    async show(request:any, response:any) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point) {
            return response.status(400).json({message: 'Point not found'});
        }

        const serializedPoint = {
          ...point,
          image_url: `http://192.168.1.222:3333/uploads/${point.image}`,
      };

        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title')
        
        return response.json({ point: serializedPoint, items })
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
            image: request.file.filename,
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
      
          const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
            return {
              item_id,
              point_id,
            }
          })
          await trx('point_items').insert(pointItems)

  
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