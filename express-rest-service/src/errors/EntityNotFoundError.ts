/**
   This error gets thrown if the entity that was request doesn't exist
*/
export class EntityNotFoundError extends Error {
    constructor(m: string) {
        super(m);

        Object.setPrototypeOf(this, EntityNotFoundError.prototype);
    }
}
