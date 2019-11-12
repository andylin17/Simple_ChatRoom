import React, { Component } from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CustomRender from './CustomRender';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';

let people = [];

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('\\b' + escapedValue, 'i');

    return people.filter(person => regex.test(getSuggestionValue(person)));
}

function getSuggestionValue(suggestion) {
    return `${suggestion.Account}`;
}

function renderSuggestion(suggestion, { query }) {
    const suggestionText = `${suggestion.Account}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);
    const style = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/Image/${suggestion.Picture})`,
        backgroundSize: '40px 40px'
    };

    return (
        <span className={'suggestion-content'} style={style}>
            <span className="name">
                {
                    parts.map((part, index) => {
                        const className = part.highlight ? 'highlight' : null;

                        return (
                            <span className={className} key={index}>{part.text}</span>
                        );
                    })
                }
            </span>
        </span>
    );
}


export default class SearchModal extends Component {
    static displayName = SearchModal.name;

    constructor(props) {
        super(props);
        this.state = {
            name:'1',
            show: false,
            value:'',
            suggestions:[]
        }
        this.addFriend = this.addFriend.bind(this);
    }

    componentDidMount = () => {
        const user = sessionStorage.getItem("user");
        fetch('Loginfo/search/' + user).then(res => res.json())
            .then(data => { people = data; });
    }
    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    async addFriend() {
        const a = sessionStorage.getItem('user');
        const b = this.state.value;
        const js = JSON.stringify({ id: '', user_A: a, user_B: b, messagelist: []});
        const context = {
            method: "post", headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: js
        };
        await fetch('Dialog', context);//.then(res => res.json()).catch(err => console.log(err));
        const { refresh } = this.props;
        refresh.call(this);
        this.setState({ show: false });
    }

    render() {
        const handleClose = () => this.setState({ show: false });
        const handleShow = () => this.setState({ show: true });
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Searching...",
            value,
            onChange: this.onChange
        };

        return (
            <>
                <Button color="primary" onClick={handleShow} className="in-right" >
                    Launch
                </Button>

                <Modal isOpen={this.state.show}>
                    <ModalHeader toggle={handleClose}>
                        Modal heading
                    </ModalHeader>
                    <ModalBody>
                        <div className="input-group">
                            <CustomRender
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={inputProps}
                        />
                            <span className="input-group-btn">
                                <button className="btn btn-info" type="button">
                                    Go!
						</button>
                            </span>
				        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addFriend}>
                            Add
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}