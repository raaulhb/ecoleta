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

        return response.json(points)
    } 

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
            image: 'https://images.unsplash.com/photo-1526399743290-f73cb4022f48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
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