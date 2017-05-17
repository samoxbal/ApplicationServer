import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Card} from 'semantic-ui-react';
import * as d3 from 'd3';
import Header from './Header';
import {fetchSingleMeasure} from '../actions';

const mapStateToProps = state => ({
    measure: state.measure
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchSingleMeasure
}, dispatch);

class MeasurePage extends Component {
    componentWillMount() {
        const {match: { params: { id } }, fetchSingleMeasure} = this.props;
        fetchSingleMeasure(id);
    }

    renderChart(points) {
        const margin = {top: 20, right: 15, bottom: 20, left: 60},
            width = 900 - margin.left - margin.right,
            height = 350 - margin.top - margin.bottom;

        const x = d3.scaleLinear()
            .domain([0, d3.max(points, d => d[0])])
            .range([ 0, width ]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(points, d => d[1])])
            .range([ height, 0 ]);

        const chart = d3.select('.MeasurePage__Chart')
            .append('svg:svg')
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .attr('class', 'chart');

        const main = chart.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'main');

        const xAxis = d3.axisBottom()
            .scale(x);

        main.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .attr('class', 'main axis date')
            .call(xAxis);

        const yAxis = d3.axisLeft()
            .scale(y);

        main.append('g')
            .attr('transform', 'translate(0,0)')
            .attr('class', 'main axis date')
            .call(yAxis);

        const g = main.append("svg:g");

        g.selectAll("scatter-dots")
            .data(points)
            .enter().append("svg:circle")
            .attr("cx", d => x(d[0]) )
            .attr("cy", d => y(d[1]) )
            .attr("r", 8);
    }

    render() {
        const {points} = this.props.measure;
        points && this.renderChart(points);

        return (
            <div>
                <Header/>
                <div className="MeasurePage">
                    {points &&
                    <Card className="MeasurePage__ChartCard">
                        <div className="MeasurePage__Chart">

                        </div>
                    </Card>}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeasurePage);