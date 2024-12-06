import { Model, ModelStatic } from "sequelize";
import { MakeNullishOptional } from "sequelize/types/utils";

export abstract class DAO<M extends Model, T extends MakeNullishOptional<M["_creationAttributes"]> | undefined> {
    public getAll = async (model: ModelStatic<M>) => await model.findAll();

    public getById = async (model: ModelStatic<M>, id: string) => await model.findByPk(id);

    // TODO: change to user
    public getByUsername = async (model: ModelStatic<M>, username: any) =>
        await model.findOne({
            where: {
                username: username
            }
        })

    public create = async (model: ModelStatic<M>, createElement: T) =>
        await model.build({
            ...createElement
        }).save()

    public update = async (updateElement: M) => await updateElement.save();

    public delete = async (deleteElement: M) => await deleteElement.destroy();
}
