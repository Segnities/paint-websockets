import {makeAutoObservable} from "mobx";

class UsernameFormState {
    username= "";
    formSubmitted = false;

    constructor() {
        makeAutoObservable(this);
    }

    submitForm(username) {
        this.username = username;
        this.formSubmitted = true;
    }
}

export default new UsernameFormState();