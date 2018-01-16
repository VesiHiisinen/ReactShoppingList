import React from 'react';
import Header from './Header';
import Main from './Main';

export default class Container extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            shoppingList: [],
            isLogged:false,
            token:"",
            edit: false,
            item: {
                "id": 0,
                "item": "",
                "price": 0,
                "count":0
            },

        }
        this.updateList = this.updateList.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }
    componentDidMount() {
        if (this.state.isLogged) {
            this.updateList();
        }
        
    }

    onRegister(user) {
        let fetchType= {
            "method":"POST",
            "headers":{"Content-Type":"application/json"},
            "mode":"cors",
            "body":JSON.stringify({
                "uname":user.uname,
                "pword":user.pword
            })
        };
    fetch("/register", fetchType).then((response) => {
        if(response.ok) {
            response.json().then((data) => 
                console.log(data)
            )
        } else {
            response.json().then((data) => 
                alert(data.message)
            )
        }
    })
    }
    onLogin(user) {
        let fetchType= {
            "method":"POST",
            "headers":{"Content-Type":"application/json"},
            "mode":"cors",
            "body":JSON.stringify({
                "uname":user.uname,
                "pword":user.pword
            })
        };
    fetch("/login", fetchType).then((response) => {
        if(response.ok) {
            response.json().then((data) => {
                this.setState({
                    isLogged:true,
                    token:data.token
                })
                this.updateList()
            });
        } else {
            response.json().then((data) => 
                alert(data.message)
            )
        }
    });
    }

    onLogout() {
        let fetchType = {
            "method": "POST",
            "headers": {"Content-Type":"application/json"},
            "mode":"cors",
            "body":JSON.stringify({
                "token":this.state.token
            })
        }
        this.setState({
            isLogged:false,
            token:"",
            shoppingList:[],
                item:{
                    "id":0,
                    "item":"",
                    "price":0,
                    "count":0
                }
        })
        fetch("/logout", fetchType).then((response) => {
            response.json().then((data) =>
                console.log(data)
            )
        })
    }

    updateList(e) {
        let fetchType = {
            "method": "GET",
            "headers": {"Content-Type":"application/json",
                        "token":this.state.token},
            "mode": "cors"
        }
        fetch("/api/item", fetchType).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    console.log(data);
                    this.setState({
                        shoppingList:data
                    })
                });
            }
        });

    }
    updateItem(item) {
        let fetchType = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token":this.state.token},
            mode: "cors",
            body:JSON.stringify({
                "id": item.id,
                "item": item.item,
                "price": item.price,
                "count": item.count
            })
        }
        fetch("/api/item/"+item.id, fetchType)
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    console.log(data);
                    this.setState({
                        edit: false
                    })
                    this.updateList();
                })
            }
        });
    }

    addItem(item) {
        let fetchType = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token":this.state.token},
            mode: "cors",
            body:JSON.stringify( {
                "item": item.item,
                "price": item.price,
                "count": item.count
            })     
        }
        fetch("/api/item/", fetchType)
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                console.log(data);
                this.updateList();
                })
            }
        });
    }   
    deleteItem(id) {
        let fetchType = {
            "method": "DELETE",
            "headers": {
                "Content-Type": "application/json",
                "token":this.state.token},
            "mode": "cors",
        }
        fetch("/api/item/"+id, fetchType)
        .then((response) => {
        response.json().then((data) => {
            console.log(data);
            this.updateList();
            })
        });
    }
    editItem(item) {

    }
    render() {
        return(
            <div>
                <Header isLogged={this.state.isLogged}
                onLogout={this.onLogout}/>
                <Main edit={this.state.edit}
                addItem={this.addItem}
                updateItem={this.updateItem}
                shoppingList={this.state.shoppingList}
                deleteItem={this.deleteItem}
                editItem={this.editItem}
                item={this.state.item}
                onRegister={this.onRegister}
                onLogin={this.onLogin}
                isLogged={this.state.isLogged}/>
            </div>    
        )
    }
}