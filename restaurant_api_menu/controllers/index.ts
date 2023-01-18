
// Import field valitator from utils

import { Request, Response, NextFunction } from "express";

const { Article, Menu, Order, Restaurant } = require('../models/index');


/* --------------------------- ARTICLES ------------------------------------------------ */

exports.articleById = (req: any, res: any, next: any) => {

};

exports.readArticles = (req: any, res: any, next: any) => {
    Article.find({}, (err: any, articles: any) => {
        if (err) {
            console.log(err);
        } else {
            console.log(articles);
            res.json(articles);
        }
    }).select({ __v: 0 });
};


exports.createArticle = async (req: any, res: any, next: any) => {
    console.log(req.body);
    const articleDocument = new Article(req.body);
    try {
        const response = await articleDocument.save();
        res.json(response);
    } catch (error) {
        console.log(error);
    }

};

exports.updateArticle = async (req: any, res: any, next: any) => {

    try {
        const article = await Article.updateOne({ _id: req.params.id }, req.body).exec();
        res.json(article);
    } catch (error: any){
        console.log(error);
    }
  
};

exports.removeArticle = async (req: any, res: any, next: any) => {
    try {
        const article = Article.deleteOne({ _id: req.params.id }).exec();
        res.status(204).json(article);
    } catch (error: any) {
        console.log(error);
        return
    }
};

/* --------------------------- MENUS ------------------------------------------------ */

exports.readMenus = async (req: any, res: any, next: any) => {
    Menu.find({}).select('-__v').populate({
        path: 'articles',
        select: '-__v'
        
    }).exec((err: any, menus: any) => {
        if (err) {
            console.log(err);
        } else {
            console.log(menus);
            res.status(200).json(menus);
        }
    });
};


// exports.readMenu = async (req: any, res: any, next: any) => {

// };

exports.createMenu = async (req: any, res: any, next: any) => {
    console.log(req.body);
    const menuDocument = new Menu(req.body);
    try {
        const response = await menuDocument.save();
        res.status(201).json(response);  
    } catch (err) {
        console.log(err);  
    }

};

exports.updateMenu = async (req: any, res: any, next: any) => {
    console.log(req.body);
    try {
        const response = await Menu.updateOne({ _id: req.params.id }, req.body).exec();
        res.status(200).json(response);  
    } catch (err) {
        console.log(err);
    }
};

exports.removeMenu = async (req: any, res: any, next: any) => {
    try {
        const menu = Menu.deleteOne({ _id: req.params.id }).exec();
        return res.status(204).json({ message: 'successfully deleted' });
    } catch (error: any) {
        console.log(error);
        return;
    }
}; 

/* --------------------------- ORDERS ------------------------------------------------ */

exports.readOrders = async (req: Request, res: Response, next: NextFunction) => {
    Order.find({}).select('-__v').populate({
        path: 'order.menus',
        select: '-__v',
        populate: {
            path: 'articles',
            select: '-__v'
        }
    }).populate({
        path: 'restaurant',
        select: '-__v'
    }).exec((err: any, orders: any) => {
        if (err) {
            console.log(err);
            res.status(500);
            return;
        } else {
            console.log(orders);
            res.status(200).json(orders);
            next();
        }
    });
};

exports.createOrder = async (req: any, res: any, next: any) => {
    console.log(req.body);
    const orderDocument = new Order(req.body);
    try {
        const response = await orderDocument.save({
            select: '-__v'
        });
        await Order.populate(response, [
            {path:'restaurant',select: '-__v'},
            {path:'restaurant.menus',select: '-__v'},
            {path:'order.menus', populate:{path:'articles',select: '-__v'}}
        ])
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
    }
};

exports.updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('restaurant');

        await order.populate({
        path: 'restaurant',
        select: '-__v',
        populate: {
            path: 'menus',
            select: '-__v',
            populate: {
                path: 'articles',
                select: '-__v'
            }
        }}).execPopulate();

        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500);
        return;
    };
};


exports.updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await Order.findById(req.params.id);
        order.set({ "order.status": req.body.status });
        await order.save();
        await order.populate('restaurant', '-__v').populate({
            path: 'order.menus',
            select: '-__v',
            populate: {
            path: 'articles',
            select: '-__v'
        }
        }).execPopulate();
        return res.status(200).json(order);

    } catch (error) {
        console.error(error);
        res.status(500);
    }
};

exports.removeOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id).select('-__v');
        res.status(204).json(order);
        next();
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
};


/* --------------------------- RESTAURANTS ------------------------------------------------ */

exports.readRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.find({}).select('-__v').populate({
            path: 'menus',
            select: '-__v',
            populate: {
                path: 'articles',
                select: '-__v'
            }
        });
        if (!restaurant || restaurant.length === 0) {
            return res.status(404).json({ message: 'No restaurants found' });
        }
        res.status(200).json(restaurant);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred while retrieving restaurants' });
    }
};



exports.createRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const restaurantDocument = new Restaurant(req.body);
    try {
        const response = await restaurantDocument.save().select('-__v').populate({
            path: 'menus',
            select: '-__v',
            populate: {
                path: 'articles',
                select: '-__v'
            }
        });
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500)
    }
};


exports.updateRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-__v').populate({
            path: 'menus',
            select: '-__v',
            populate: {
                path: 'articles',
                select: '-__v'
            }
        });
        if (!updatedRestaurant) {
            return res.status(500).json({ message: "Error updating restaurant" });
        }
        res.status(200).json(updatedRestaurant);
    } catch (error: any) {
        console.error(error);
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Error updating restaurant" });
        }
    }
};

exports.removeRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id).select('-__v');
        if (!deletedRestaurant) {
            return res.status(500).json({ message: "Error deleting restaurant" });
        }
        res.status(200).json({ message: "Restaurant deleted successfully" });
    } catch (error: any) {
        console.error(error);
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Error deleting restaurant" });
        }
    }
};


// en cours
// livraison
// délivré