import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts';

// const data = [
//     {
//         name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
//     },
//     {
//         name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
//     },
//     {
//         name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
//     },
//     {
//         name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
//     },
//     {
//         name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
//     },
//     {
//         name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
//     },
//     {
//         name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
//     },
// ];

// const oneDayData = this.props.currentUser.balance

class Graph extends React.Component {

    constructor(props) {
        super(props);

        this.totalPortfolioValue = this.totalPortfolioValue.bind(this)
        this.renderReCharts = this.renderReCharts.bind(this);
        this.graphDataCalculation = this.graphDataCalculation.bind(this)

        this.state = {
            dateViewed: '1d'
        }

    }

    componentDidMount() {
        debugger
        // let transaction = {
        //     user_id: this.props.currentUser.id
        // }
        // this.props.getAllTransaction(transaction)
        //     .then(transactions => {
        //         debugger
        //         let symbolsArray = Object.keys(transactions.transactions);
        //         this.props.receivePrices(symbolsArray);
        //     })
    }


    graphDataCalculation() {
        debugger

        // if ((Object.keys(this.props.graphPrices)).length !== (Object.keys(this.props.transactions).length)) {
        //     return null;
        // }

        if(this.props.graphPrices['fiveMin'] === undefined){
            return null;
        }

        let data;

        if (this.state.dateViewed === '1d') {
            data = this.props.graphPrices['fiveMin']
        } else if (this.state.dateViewed === '1w') {
            data = this.props.graphPrices['thirtyMin']
        } else {
            data = this.props.graphPrices['fiveYr']
        }
        

        let todayDate = new Date(); //Tue Sep 22 2020 17:37:01 GMT-0400 (Eastern Daylight Time)
        let dayOfWeek = todayDate.getDay(); //2
        let isWeekend = ((dayOfWeek === 0) || (dayOfWeek === 6)) //SUN/SAT
        let yesterday = moment().subtract(2, 'days');
        let symbols = Object.keys(this.props.transactions) //ARRAY
        let dataArray = [];
        
        if (this.state.dateViewed === '1d' && !isWeekend) { //ONE DAY VIEW/WEEKDAY
            
            
        } else if (this.state.dateViewed === '1d' && isWeekend){
            
            symbols.forEach((symbol, idx) => {
                
                // debugger
                let sharesAmt = this.props.transactions[symbol].shares
                let individualCompany = data[symbol].chart;
                let filterIndividualCompanyArray = individualCompany.filter(ele => {
                    return moment(ele.date).isSame(yesterday, 'day') //will only return the date that is the day as today
                })
                // debugger
                let subdata = filterIndividualCompanyArray.forEach( (ele,idx) => {
                    // debugger
                    
                    if (dataArray[idx] === undefined) {
                        dataArray[idx] = (ele.close * sharesAmt);
                    } else {
                        dataArray[idx] += (ele.close * sharesAmt);
                    }
                })

            })
        }
        
        let test = dataArray.map( ele => {
            // debugger
           let rObj = {}
            rObj['data'] = ele;
            return rObj
        })
        // console.log(test)
        return (this.renderReCharts(test))


    }


    renderReCharts(data) {
        debugger
        return(
            <LineChart width={800} height={300} data={data}>
                <XAxis dataKey="data" hide={true} />
                <YAxis domain={['dataMin', 'dataMax']} axisLine={false} hide={true}/>
                <Tooltip 
                    position={{ y: 0 }}
                    // offset={toolTipOffSet}
                    isAnimationActive={false}
                    // content={this.customToolTip}
                    wrapperStyle={{ top: -15 }}/>
                <Legend />
                <Line type="linear" dataKey="data" stroke="#8884d8" dot={false} strokeWidth={2} />
            </LineChart>
        )
    }

    totalPortfolioValue() {
        debugger
        if (Object.keys(this.props.prices).length === 0){
            return 0;
        }
        let totalValue = 0;
        let symbols = Object.keys(this.props.transactions)
        symbols.forEach( (symbol) => {
            debugger
            if(this.props.transactions[symbol].shares !==0){
                debugger
            let subValue = this.props.transactions[symbol].shares * this.props.prices[symbol];
            totalValue = totalValue + subValue
            }
        },this)
        return(
            totalValue
        )
    }

    render() {
        debugger
        return (
            <div>
                <h1>
                    {numeral(this.props.currentUser.balance + this.totalPortfolioValue()).format('$0,0.00')}
                </h1>
                {this.graphDataCalculation()}
            </div>
        );
    }
}


export default Graph;

