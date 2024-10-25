import { chat } from "../types";
import { api } from "../utils/server";

class Service{
    private apiRoute;

    constructor( route: string ){
        this.apiRoute = `${api}/${route}`
    }

    getAll = async () => {
        return fetch(this.apiRoute, {
            method: 'GET'
        })
    }

    getById = async ( id: string ) => {
        return fetch(`${this.apiRoute}/${new URLSearchParams({
            id: id
        })}`, {
            method: 'GET'
        })
    }

    create = async ( createElement: chat ) => {
        return fetch(this.apiRoute, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                createElement: createElement
            })
        })
    }

    update = async ( updateElement: chat ) => {
        return fetch(this.apiRoute, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                updateElement: updateElement
            })
        })
    }

    delete = async ( id: string ) => {
        return fetch(`${this.apiRoute}/${new URLSearchParams({
            id: id
        })}`, {
            method: 'DELETE'
        })
    }    
}

export const chatService = new Service('chats');