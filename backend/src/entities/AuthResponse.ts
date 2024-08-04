export default interface AuthResponse {
    user?: any,
    isError: boolean,
    token?: string,
    error?: any,
    doesExist?: boolean
}