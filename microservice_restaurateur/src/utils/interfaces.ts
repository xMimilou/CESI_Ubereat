export interface Product {
    name: string;
    price: number;
    quantity: number;
    type?: string;
    image_url: string,
    _id: string
};

export interface Article {
    name: string,
    type: string,
    quantity: number,
    price: number,
    image_url?: string,
    _id?: string
};

export interface Menu {
    name: string,
    articles: [],
    price: number,
    image_url?: string,
    _id?: string
};

export interface Restaurant {
    name: string,
    location: string,
    opening_time: number[][],
    menus: [],
    image_url: string,
    _id?: string;
};

export interface Order {
    order: {
        delivery_person: {
            deliver_username: string,
            delivery_location: string
        },
        menus: Menu[],
        total_cost: number,
        status: string,
        time_placed: Date,
        time_delivered: Date
    },
    client: string,
    code_client: string,
    code_restaurant: string,
    restaurant?: Restaurant
    _id: string
};