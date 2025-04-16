import News from "../models/news.js";

export const createNews = async(req,res)=>{

        try {
            const {news_title,news_desc} =  req.body;
           
            const existingTitle = await News.findOne({where : {news_title}});
           
            if(existingTitle){
                return res.status(400).json({data : "News title is already Exist..."});
            } 

            const result = await News.create({news_title,news_desc});
            res.status(201).json(result);
    } catch (error) {
        res.status(500).json({error : error.message});
        
    }
}

export const getAllNews = async(req,res)=>{
    try {
        const result = await News.findAll();
        res.status(200).json({data : result});
    } catch (error) {
        res.status(400).json({error : error.message});
    }
};

export const deleteNews = async(req,res)=>{
    try {
        const { id }  = req.params;
        if(!id) {
            return res.status(400).json({error : "ID Is not Present."});
        }

        const news = await News.findByPk(id);
        if(!news){
            return res.status(400).json({error:"News is not found."})

        }

        await news.destroy();
        res.status(200).json(news);
     } catch (error) {
        res.status(500).json({error : error.message});
        
    }
}

export const updateNews = async(req,res)=>{
    try {
        const {id} = req.params;
        const {news_title,news_desc} = req.body;
        if(!id){
            return res.status(400).json({error : error.message});
        }

        const news = await News.findByPk(id);
        if(!news){
            return res.status(400).json({error : error.message});
        }

        news.news_desc = news_desc || news.news_desc;
        news.news_title = news_title || news.news_title;

        await news.save();
        res.status(201).json({
            message : "News Updated Successfully",
            data : news
        });
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}