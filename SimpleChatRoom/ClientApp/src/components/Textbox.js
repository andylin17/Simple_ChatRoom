import React, { Component } from 'react';

export class Textbox extends Component {
    static displayName = Textbox.name;
    constructor(props) {
        super()
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <input type="text" name={this.props.name} value={this.props.value} onChange={this.handleInputChange.bind(this)} />
            )
    }
}