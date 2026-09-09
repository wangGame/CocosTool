export interface GameListener {
    run(): void;
}

export interface GameData{
    name: string;
    row: number;
}

export class ConfigData{
    index:number = 0;
    value:number = 0;
}

export const CONFIG_DATA : Record<any, any> = {
    "":""
}

export const CONFIG_DATA2 : Record<string, {
    index:number,
    value:number,
}> = {
    "x":{
        index : 1,
        value : 0,
    }
}
