export interface IEntry {
    id: number
    API: string,
    Auth: string,
    Category: string
    Cors: string
    Description: string
    HTTPS: string
    Link: string
}

export interface IEntries {
    count: number,
    entries: IEntry[]
}