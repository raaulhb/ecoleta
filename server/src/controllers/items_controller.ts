import knex from "../database/connection";
import { Request, Response } from "express";

interface ItemType {
    id: Number,
    title: String,
    image: String,
  }

class ItemsController {
    async index(request: any, response: any) {
        const items = await knex('items').select('*');
    
        const serializedItems = items.map((item: ItemType) => {
         return {
          id: item.id,
          title: item.title,
          image_url: `http://localhost:3333/uploads/${item.image}`
         }
        });
    
        return response.json(serializedItems)
      }
}

export default ItemsController;