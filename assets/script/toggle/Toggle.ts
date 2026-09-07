import { _decorator, Component, Node } from 'cc';
import {tony} from "db://assets/script/People";
import People = tony.People;
const { ccclass, property } = _decorator;


@ccclass('Toggle')
export class Toggle extends Component {
    start() {
        var people = new People();
        const {name } = people
        console.log(name)
    }

    update(deltaTime: number) {
        
    }
}


