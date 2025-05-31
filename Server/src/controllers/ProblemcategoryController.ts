
import { Request, Response } from "express";
import { Problem } from "../models/Problem";


export const getProblemsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params; 
    
    
    const problems = await Problem.find({ category });
    
    
    if (!problems || problems.length === 0) {
      return res.status(404).json({ message: "No problems found for this category" });
    }

    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching problems", error });
  }
};
