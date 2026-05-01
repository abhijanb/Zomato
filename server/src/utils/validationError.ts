export default class ValidationError {
    constructor(public error: { field: string; message: string }[]) { }
}
