import { user } from "../types";

class Service{
    private apiRoute;

    constructor( route: string ){
        this.apiRoute = `${import.meta.env.VITE_API_URL}/${route}`
    }

    getAll = async () => 
        fetch(this.apiRoute, {
            method: 'GET'
        })
    

    getById = async ( id: string ) => 
        fetch(`${this.apiRoute}/${id}`, {
            method: 'GET'
        })
    

    create = async ( createElement: user ) => 
        fetch(this.apiRoute, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                createElement: createElement
            })
        })
    

    update = async ( id: string, updateElement: user ) => 
        fetch(`${this.apiRoute}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                updateElement: updateElement
            })
        })

    delete = async ( id: string ) => 
        fetch(`${this.apiRoute}/${id}`, {
            method: 'DELETE'
        })
    

    login = async ( username: string, password: string ) => 
        fetch(`${this.apiRoute}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: { username: username, password: password }
            })
        })

    selfDelete = async ( id: string, token: string ) =>
        fetch(`${this.apiRoute}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

    isAuthenticated = async ( token: string ) => 
        fetch(`${this.apiRoute}/authenticated`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    
}

export const userService = new Service('users');