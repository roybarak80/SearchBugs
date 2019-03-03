import React, {Component} from 'react';

function WarningBanner(props) {
    if (!props.warn) {
        return null;
    }

    return (
        <div className="col-md-12">
            <div className="alert alert-danger" role="alert">
                {props.warn}
            </div>
        </div>
    );
}

export default class TestersList extends Component {

    constructor(props) {
        super(props);
        this.SortNameButton = this
            .SortNameButton
            .bind(this);
        this.SortCountryButton = this
            .SortCountryButton
            .bind(this);
        this.state = {
            isSortAble: true,
            sortDirection:true
           
        };
    }

    SortNameButton() {


        return (
            <span className="ml-1" onClick={e => this.onSort(e, 'firstName')}>
                {!!this.state.sortDirection && 
                <i className="fas fa-sort-amount-up"></i>
            }
            {!this.state.sortDirection && 
                <i className="fas fa-sort-amount-down"></i>
            }
            </span>
        );
    }

    SortCountryButton() {

       
        return (
            <span className="ml-1" onClick={e => this.onSort(e, 'country')}>
            {!!this.state.sortDirection && 
                <i className="fas fa-sort-amount-up"></i>
            }
            {!this.state.sortDirection && 
                <i className="fas fa-sort-amount-down"></i>
            }
            </span>
        );
    }

    onSort(event, sortKey) {

        let sortedTesters = this.props.testers;
        let sortDirection = this.state.sortDirection; 

        if(!!sortDirection){
            sortedTesters.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
            this.setState(() => ({sortDirection:false}));
            
        }
        if(!sortDirection){
            sortedTesters.sort((a,b) => b[sortKey].localeCompare(a[sortKey]))
            this.setState(() => ({sortDirection:true}));
        }
        this.setState(() => ({testers: sortedTesters, requestStatus: false}));

    }

    render() {

        let rows = [];
        let SortFirstNameButton;
        let SortCountryButton;
        const testers = this.props.testers;
        const isShowTable = this.props.isShowTable;
        const requestStatus = this.props.requestStatus;

        if (Array.isArray(testers)) {
            SortFirstNameButton = <this.SortNameButton/>;
            SortCountryButton = <this.SortCountryButton/>;

        }

        if (Array.isArray(testers)) {

            this
                .props
                .testers
                .map((tester, index) => rows.push(<TestersItem key={index} tester={tester}/>))
        } else {

            let testerName = this.props.testers.firstName
            rows.push(<TestersItem key={testerName} tester={this.props.testers}/>)

        }

        return (
            <div>

                <div className="row">
                    <WarningBanner warn={this.props.requestStatus}/>
                </div>

                {isShowTable && requestStatus === false && <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex">
                                    <span>Firstname</span>
                                    {SortFirstNameButton}
                                </div>

                            </th>
                            <th>Lastname</th>
                            <th>
                                <div className="d-flex">
                                    <span>Country</span>
                                    {SortCountryButton}
                                </div>
                            </th>
                            <th>Bugs

                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {rows}

                    </tbody>
                </table>
}

            </div>
        )
    }
}
TestersList.defaultProps = {
    testers: []
};

class TestersItem extends React.Component {
    render() {
        return (

            <tr>
                <td>{this.props.tester.firstName}</td>
                <td>{this.props.tester.lastName}</td>
                <td>{this.props.tester.country}</td>
                <td>{this.props.tester.bugs}</td>
            </tr>

        )
    }
}
