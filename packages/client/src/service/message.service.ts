import { message } from "../types";

class Service{
    private apiRoute;

    constructor( route: string ){
        this.apiRoute = `${import.meta.env.VITE_API_URL}/${route}`
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

    create = async ( createElement: message ) => {
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

    update = async ( id: string, updateElement: message ) => {
        return fetch(`${this.apiRoute}/${id}`, {
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

    deleteAll = async () => {
        return fetch(`${this.apiRoute}/temp/all`, {
            method: 'DELETE'
        })
    }
}

export const messageService = new Service('messages');