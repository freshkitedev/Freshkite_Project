import { Request,Response} from "express";
import { fetchGoogleDocAsJson } from "../utils/docsToJson";
export const createCourseFromDocs  = async(req:Request,res:Response) =>{
    try{
        const {docLink} = req.body;
        const docId=docLink.split('/d/')[1]?.split('/')[0];

        if (!docId) return res.status(400).json({ error: 'Invalid Doc URL' });
        const jsonData = await fetchGoogleDocAsJson(docId);
        //... add the course to database logic
        res.status(200).json(jsonData);
    }catch(error:any){
        return res.status(500).json({error:'Something went wrong',Error:error})
    }
}