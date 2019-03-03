import React, {Component} from 'react';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            isValidInput: false
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const text = this.state.inputValue;
        this
            .props
            .handleSubmit(text);
    };

    updateInputValue(evt) {

        const inputText = evt.target.value;
        if (inputText.length >= 2 && inputText.length <= 12) {

            this.setState({isValidInput: true, inputValue: evt.target.value});

        } else {
            this.setState({isValidInput: false, inputValue: evt.target.value});

        }
        
    }
    render() {

        return (
            <div>
                <div className="row mb-4">
                    <div className="col-md-12 ">
                        <div className="row  align-items-center">
                        <div className="col-md-12 d-flex align-items-center search-field-row" >
                               
                            <div className="mr-2">
                                <span >Tester's Name</span>
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    className={'form-control' + (!this.state.isValidInput ? ' invalidInput': '')}
                                    value={this.state.inputValue}
                                    onChange={evt => this.updateInputValue(evt)}
                                    placeholder="Enter the tester name"/>
                            </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-end">

                                <button
                                    disabled={!this.state.isValidInput}
                                    className="btn btn-primary "
                                    onClick={this.handleSubmit}>Fetch</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );

    }
}
