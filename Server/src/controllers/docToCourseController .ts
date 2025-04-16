import { Request,Response} from "express";
import { fetchGoogleDocAsMarkdown } from "../Services/googleDocService";
import { parseMarkdownContent } from "../utils/parseMarkdown";
export const createCourseFromDocs  = async(req:Request,res:Response) =>{
    try{
        const {docLink} = req.body;
        const docId=docLink.split('/d/')[1]?.split('/')[0];

        if (!docId) return res.status(400).json({ error: 'Invalid Doc URL' });
        const markDown = await fetchGoogleDocAsMarkdown(docId);
        if (!markDown) {
            return res.status(500).json({ error: 'Failed to fetch document content.' });
        }
        const structuredData = await parseMarkdownContent(markDown);
        //... add the course to database logic
        res.status(200).json(structuredData);
    }catch(error:any){
        return res.status(500).json({error:'Something went wrong'})
    }
}