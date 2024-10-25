import { BuildOptions, Model, ModelStatic } from "sequelize";
import { MakeNullishOptional } from "sequelize/types/utils";

// type ModelStatic<T> = typeof Model & 
//     (new(values?: object, options?: BuildOptions) => T)

export abstract class DAO<M extends Model, T extends MakeNullishOptional<M["_creationAttributes"]> | undefined>{
    public getAll = async ( model: ModelStatic<M> ) => {
        return await model.findAll();
    }

    public getById = async ( model: ModelStatic<M>, id: string ) => {
        return await model.findByPk(id);
    }

    public create = async ( model: ModelStatic<M>, createElement: T ) => {
        return await model.build({
            ...createElement
        }).save()
    }

    public update = async ( updateElement: M ) => {
        return await updateElement.save();
    }

    public delete = async ( deleteElement: M ) => {
        return await deleteElement.destroy();
    }
}