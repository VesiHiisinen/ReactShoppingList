// FORM MODULE

import React from 'react';

export default class ShoppingForm extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            id: props.item.id,
            item: props.item.item,
            price: props.item.price,
            count: props.item.count
        }
        this.update = this.update.bind(this);
        this.submit = this.submit.bind(this);
    }


    update(e) {
        if (e.target.name === "item") {
            this.setState({
                item: e.target.value
            })
        }
        if (e.target.name === "price") {
            this.setState({
                price: e.target.value
            })
        }
        if (e.target.name === "count") {
            this.setState({
                count: e.target.value
            })
        }
    }

    submit(e) {
        e.preventDefault();
        let tempItem = {
            "id": this.state.id,
            "item": this.state.item,
            "count": this.state.count,
            "price": this.state.price
        }
        if (this.props.edit) {
            this.props.updateItem(tempItem);
        } else {
            this.props.addItem(tempItem);
        }
    }

    render() {
        let mode = "Add";
        if (this.props.edit) {
            mode: "Edit";
            }
        return(
            <form onSubmit={this.submit}>
                <label htmlFor="item">Item type </label>
                <input  type="text"
                    name="item"
                    placeholder="enter item"
                    onChange={this.update}
                    value={this.state.item}/>
                <label htmlFor="price">price/€ </label>    
                <input  type="number"
                    name="price"
                    placeholder="enter price"
                    onChange={this.update}
                    value={this.state.price}/>
                <label htmlFor="count">count </label>    
                <input  type="number"
                    name="count"
                    placeholder="enter count"
                    onChange={this.update}
                    value={this.state.count}/>
            <input type="submit" value ={mode}/>
        </form>            
        )
    }
}