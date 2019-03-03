import React, {Component} from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBarComponent';
import TestersList from './components/TestersListComponent';
import './App.css';

function getData(tester) {
   
    return axios.get('https://test-api.techsee.me/api/ex/' + tester );
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            testers: [],
            requestStatus: false,
            isShowTable:false,
        };
    }

    stringifyBugs = (testersData) => {

       var outResults = '';
       
        if (Array.isArray(testersData)) {
    
            for (var ind01 = 0; ind01 < testersData.length; ind01++) {
                var testerItem = testersData[ind01];
                if (testerItem.bugs) {
    
                    var testersBugs = testerItem
                        .bugs
                        .map(function (item) {
                            return item.title;
                        })
    
                    testerItem.bugs = testersBugs.join(", ");
                }
            }
            
    
        } else {
    
            var testersBugsArr = testersData
                .bugs
                .map(function (item) {
                    return item.title;
                })
    
                testersData.bugs = testersBugsArr.join(", ");
    
        }
        outResults = testersData;
        return outResults;
    }

    handleSearch = (tester) => {

        getData(tester).then(response => {

            var testersData = this.stringifyBugs(response.data);
           
            this.setState(() => ({testers: testersData, 
                requestStatus:false,
                isShowTable:true}));

        }).catch(error => {
            this.setState({requestStatus: 'Temporary error occurred, please try again later', testers: []})
        })

    }

    render() {
        return (

            <div className="app-container">
                <div className="jumbotron">
                    <div className="d-flex align-items-center justify-content-between">
                    <span className="display-4">Search Bugs</span>
                    <span> <i className="fas fa-bug display-4"></i></span>
                    </div>

                    <hr className="my-4"/>
                        <SearchBar handleSubmit={this.handleSearch}/>
                        <TestersList testers={this.state.testers}
                         requestStatus={this.state.requestStatus}
                         isShowTable={this.state.isShowTable}/>

                </div>
            </div>

        );
    }
}

export default App;
