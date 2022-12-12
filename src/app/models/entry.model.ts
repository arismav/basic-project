export interface IEntry {
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