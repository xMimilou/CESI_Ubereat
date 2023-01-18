"use strict";
// Import field valitator from utils
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Article, Menu, Order, Restaurant } = require('../models/index');
/* --------------------------- ARTICLES ------------------------------------------------ */
exports.articleById = (req, res, next) => {
};
exports.readArticles = (req, res, next) => {
    Article.find({}, (err, articles) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(articles);
            res.json(articles);
        }
    }).select({ __v: 0 });
};
exports.createArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const articleDocument = new Article(req.body);
    try {
        const response = yield articleDocument.save();
        res.json(response);
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield Article.updateOne({ _id: req.params.id }, req.body).exec();
        res.json(article);
    }
    catch (error) {
        console.log(error);
    }
});
exports.removeArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = Article.deleteOne({ _id: req.params.id }).exec();
        res.status(204).json(article);
    }
    catch (error) {
        console.log(error);
        return;
    }
});
/* --------------------------- MENUS ------------------------------------------------ */
exports.readMenus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    Menu.find({}).select('-__v').populate({
        path: 'articles',
        select: '-__v'
    }).exec((err, menus) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(menus);
            res.status(200).json(menus);
        }
    });
});
// exports.readMenu = async (req: any, res: any, next: any) => {
// };
exports.createMenu = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const menuDocument = new Menu(req.body);
    try {
        const response = yield menuDocument.save();
        res.status(201).json(response);
    }
    catch (err) {
        console.log(err);
    }
});
exports.updateMenu = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const response = yield Menu.updateOne({ _id: req.params.id }, req.body).exec();
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
    }
});
exports.removeMenu = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu = Menu.deleteOne({ _id: req.params.id }).exec();
        return res.status(204).json({ message: 'successfully deleted' });
    }
    catch (error) {
        console.log(error);
        return;
    }
});
/* --------------------------- ORDERS ------------------------------------------------ */
exports.readOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    }).exec((err, orders) => {
        if (err) {
            console.log(err);
            res.status(500);
            return;
        }
        else {
            console.log(orders);
            res.status(200).json(orders);
            next();
        }
    });
});
exports.createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const orderDocument = new Order(req.body);
    try {
        const response = yield orderDocument.save({
            select: '-__v'
        });
        yield Order.populate(response, [
            { path: 'restaurant', select: '-__v' },
            { path: 'restaurant.menus', select: '-__v' },
            { path: 'order.menus', populate: { path: 'articles', select: '-__v' } }
        ]);
        res.status(201).json(response);
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('restaurant');
        //   await order.populate({
        //     path: 'restaurant',
        //     select: '-__v',
        //     populate: {
        //         path: 'menus',
        //         select: '-__v',
        //         populate: {
        //             path: 'articles',
        //             select: '-__v'
        //         }
        //   }}).execPopulate();
        res.status(200).json(order);
    }
    catch (error) {
        console.log(error);
        res.status(500);
        return;
    }
    ;
});
// exports.updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const order = await Order.findByIdAndUpdate(req.params.id, { "order.status": req.body.status }, { new: true }).select('-__v');
//         return res.status(200).json(order);
//     } catch (error) {
//         console.log(error);
//         res.status(500);
//         return;
//     }
// };
exports.updateOrderStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order.findById(req.params.id);
        order.set({ "order.status": req.body.status });
        yield order.save();
        yield order.populate('restaurant', '-__v').populate({
            path: 'order.menus',
            select: '-__v',
            populate: {
                path: 'articles',
                select: '-__v'
            }
        }).execPopulate();
        return res.status(200).json(order);
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
});
exports.removeOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order.findByIdAndDelete(req.params.id).select('-__v');
        res.status(204).json(order);
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500);
    }
});
/* --------------------------- RESTAURANTS ------------------------------------------------ */
exports.readRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield Restaurant.find({}).select('-__v').populate({
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
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred while retrieving restaurants' });
    }
});
exports.createRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantDocument = new Restaurant(req.body);
    try {
        const response = yield restaurantDocument.save().select('-__v').populate({
            path: 'menus',
            select: '-__v',
            populate: {
                path: 'articles',
                select: '-__v'
            }
        });
        res.status(201).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
});
exports.updateRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        const updatedRestaurant = yield Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-__v').populate({
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
    }
    catch (error) {
        console.error(error);
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "Error updating restaurant" });
        }
    }
});
exports.removeRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        const deletedRestaurant = yield Restaurant.findByIdAndDelete(req.params.id).select('-__v');
        if (!deletedRestaurant) {
            return res.status(500).json({ message: "Error deleting restaurant" });
        }
        res.status(200).json({ message: "Restaurant deleted successfully" });
    }
    catch (error) {
        console.error(error);
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "Error deleting restaurant" });
        }
    }
});
// en cours
// livraison
// délivré
