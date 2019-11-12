import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import '../Css/Custom.css';

export default class CustomRender extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { suggestions, onSuggestionsFetchRequested, onSuggestionsClearRequested, getSuggestionValue, renderSuggestion, inputProps } = this.props;

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                id="test"
            />
        );
    }
}

