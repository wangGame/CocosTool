import {GameData, GameListener,CONFIG_DATA2} from "db://assets/script/class/GameListener";
class People {
    run(){
        var gameListener:GameListener = new class implements GameListener {
            run(){

            }
        }
        var gameDate:GameData = new class implements GameData {
            name: string = "People";
            row: number = 100;
        }
    }

    printInfo(){
        var configdata2Element = CONFIG_DATA2["x"];
        console.log(configdata2Element.index);
        console.log(configdata2Element.value);
    }
}