import {Request, Response} from 'express'
import {getRepository} from 'typeorm';
import orphanagesView from '../views/orphanages_view'

import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';


export default{

    async index(request: Request, response:Response){
        const orphanagesRespository = getRepository(Orphanage);

        const orphanages = await orphanagesRespository.find({
            relations:['images']
        });

        return response.json(orphanagesView.renderMany(orphanages))
    },
    async show(request: Request, response:Response){
        const {id} = request.params;

        const orphanagesRespository = getRepository(Orphanage);

        const orphanage = await orphanagesRespository.findOneOrFail(id, {
            relations:['images']
        });

        return response.json(orphanagesView.render(orphanage))
    },

    async create(request: Request, response:Response){



        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
         } = request.body;
    
        const orphanagesRespository = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return {path: image.filename}
        }) 
    
        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            latitude: Yup.number().required('latitude obrigatório'),
            longitude: Yup.number().required('longitude obrigatório'),
            about: Yup.string().required(' about obrigatório ').max(300),
            instructions: Yup.string().required(' instructions obrigatório'),
            opening_hours: Yup.string().required( ' opening_hours obrigatório '),
            open_on_weekends: Yup.boolean().required(' open_on_weekends obrigatório'),

            images: Yup.array(
                Yup.object().shape({
                path: Yup.string().required()
            }))
        });

        await schema.validate(data, {
            abortEarly: false,
        })

        const orphanage = orphanagesRespository.create(data);
    
        await orphanagesRespository.save(orphanage);
    
        return response.status(201).json(orphanage);
    }
    
}