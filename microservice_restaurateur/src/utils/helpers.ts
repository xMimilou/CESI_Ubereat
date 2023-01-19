// This is the helpers file to interact with the restorer back end.

const API_RESTORER = 'http://localhost:3000/api/restorer';

const axios = require('axios').default;


import {Article, Menu, Restaurant, Order} from '@/utils/interfaces';

/* ------------------------------------- ARTICLES --------------------------------*/
// Get articles
export const getArticles = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${API_RESTORER}/articles`,
        });
        return response.data;
      } catch (error) {
        console.error(error);
    }
};

// Get dishes
const getDishes = async () => {
    try {
        const response = await axios.get(`${API_RESTORER}/articles/dishes`);
        return response.data;
      } catch (error) {
        console.error(error);
    }
}; 

// Get side dishes
const getSideDishes = async () => {
    try {
        const response = await axios.get(`${API_RESTORER}/articles/side-dishes`);
        return response.data;
      } catch (error) {
        console.error(error);
    }
};

// Get drinks
const getDrinks = async () => {
    try {
        const response = await axios.get(`${API_RESTORER}/articles/drinks`);
        return response.data;
      } catch (error) {
        console.error(error);
    }
};

// Get sauce
const getSauces = async () => {
    try {
        const response = await axios.get(`${API_RESTORER}/articles/sauces`);
        return response.data;
      } catch (error) {
        console.error(error);
    }
};



// Post article
export const postArticle = async (article: Article) => {
    console.log(article.price);

    try {
        const response = await axios({
            method: 'post',
            url: `${API_RESTORER}/articles`,
            data: {
              name: article.name,
              type: article.type,
              quantity: article.quantity,
              price: article.price
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }

};

// Delete article
export const deleteArticle = async (id: any) => {

    try {
        const response = await axios({
            method: 'delete',
            url: `${API_RESTORER}/articles/${id}`,
        });
        console.log(response.status);
    } catch (error) {
        console.log(error);
    }

};

// Update article
export const updateArticle = async (article: Article) => {
    console.log(article.price);

    try {
        const response = await axios({
            method: 'put',
            url: `${API_RESTORER}/articles/${article._id}`,
            data: {
              name: article.name,
              type: article.type,
              quantity: article.quantity,
              price: article.price,
              image_url: article.image_url
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }

};

/* ------------------------------------- MENUS --------------------------------*/
// Get menus
export const getMenus = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${API_RESTORER}/menus`,
        });
        return response.data;
      } catch (error) {
        console.error(error);
    }
};

// Post menu
export const postMenu = async (menu: Menu) => {
    axios({
        method: 'post',
        url: `${API_RESTORER}/menus`,
        data: {
            name: menu.name,
            articles: menu.articles,
            price: menu.price
        }
    })
    .then( (response: any) => response.data)
    .catch((error: any) => {
        console.log(error);
    });
};

// Update menu
export const putMenu = async (menu: Menu) => {
    console.log(menu.price);

    try {
        const response = await axios({
            method: 'put',
            url: `${API_RESTORER}/menus/${menu._id}`,
            data: {
              name: menu.name,
              articles: menu.articles,
              price: menu.price,
              image_url: menu.image_url
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }

};

// Delete menu
export const deleteMenu = async (id: any) => {

    try {
        const response = await axios({
            method: 'delete',
            url: `${API_RESTORER}/menus/${id}`,
        });
        console.log(response.status);
    } catch (error) {
        console.log(error);
    }

};

/* ------------------------------------- ORDERS --------------------------------*/
export const getOrders = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${API_RESTORER}/orders`,
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
    }
};

export const deleteOrder = async (id: string) => {
        try {
            const response = await axios({
                method: 'delete',
                url: `${API_RESTORER}/orders/${id}`,
            });
            console.log(response.status);
        } catch (error) {
            console.log(error);
        }
};


export const validateOrder = async (id: string) => {
    console.log(id);

    try {
        const response = await axios({
            method: 'put',
            url: `${API_RESTORER}/orders/${id}/status`,
            data: { status: "Validé" }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }

};

export const refuseOrder = async (id: string) => {
    console.log(id);

    try {
        const response = await axios({
            method: 'put',
            url: `${API_RESTORER}/orders/${id}/status`,
            data: { status: "Rejeté" }

        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }

};


/////
// Get restaurants
export const getRestaurants = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${API_RESTORER}/restaurants`,
        });
        return response.data;
      } catch (error) {
        console.error(error);
    }
};






////////////////////////////////////////////////////////////////////////////////////


const response_schema = {
    // `data` est le contenu de la réponse renvoyée par le serveur.
    data: {},
  
    // `status` est le code HTTP de la réponse.
    status: 200,
  
    // `statusText` est le message de statut HTTP de la réponse.
    statusText: 'OK',
  
    // `headers` sont les headers HTTP associés à la réponse.
    // Tous les noms de headers sont en minuscules et peuvent être récupérés en
    // utilisant les crochets.
    // Par exemple : `response.headers['content-type']`.
    headers: {},
  
    // `config` est la configuration de requête qui a été fournie à Axios.
    config: {},
  
    // `request` est la requête qui a engendré cette réponse.
    // Il s’agit de la dernière instance de ClientRequest avec node.js (il peut y
    // avoir des redirections) et d’une instance de XMLHttpRequest avec le
    // navigateur.
    request: {}
};


  