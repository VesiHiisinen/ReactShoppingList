// LIST MODULE
import React from 'react';

export default class ShoppingList extends React.Component {

    constructor(props) {
        super(props);

       this.remove = this.remove.bind(this);
    }

    remove(event) {
        this.props.deleteItem(event.target.name);
    }

render() {

    let table = this.props.shoppingList.map(
        (listItem) => 
            <tr key={listItem.id.toString()}>
                <td>{listItem.count}</td>
                <td>{listItem.item}</td>
                <td>{listItem.price}</td>
                <td><button name={listItem.id.toString()} onClick=
                {this.remove}>Remove</button></td>
                <td><button onClick=
                {this.props.editItem(listItem)}>Edit</button></td>
            </tr>       
        )
    return(
        <table>
            <thead>
                <tr>
                    <th>Count</th>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Remove</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {table}
            </tbody>
        </table>
    )
    }
} 