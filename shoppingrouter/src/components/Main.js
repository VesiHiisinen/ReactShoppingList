import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import ShoppingForm from './ShoppingForm';
import ShoppingList from './ShoppingList';
import LoginForm from './LoginForm';

export default class Main extends React.Component {
    
    render() {

        return(
            <Switch>
                <Route exact path='/' render={ () =>
                this.props.isLogged ?
                (<Redirect to="/list"/>)
                : (<LoginForm
                        onLogin={this.props.onLogin}
                        onRegister={this.props.onRegister}
                        />)
                    }/>
                <Route path='/list' render={
                    () =>(<ShoppingList
                        shoppingList={this.props.shoppingList}
                        deleteItem={this.props.deleteItem}
                        editItem={this.props.editItem}
                        />)
                }/>
                <Route path='/form' render={
                    ()=>(<ShoppingForm
                    edit={this.props.edit}
                    addItem={this.props.addItem}
                    updateItem={this.props.updateItem}
                    item={this.props.item}/>)
                }/>
            </Switch>
        )
    }
}