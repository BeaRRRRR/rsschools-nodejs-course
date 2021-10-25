/**
   This error gets thrown if the entity that was request doesn't exist
*/
export class EntityNotFoundError extends Error {
    constructor() {
        super('This entity does not exist');

        Object.setPrototypeOf(this, EntityNotFoundError.prototype);
    }
}
