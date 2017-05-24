import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as d3 from 'd3';
import PageLayout from './vascan-ui/PageLayout';
import VACard from './vascan-ui/VACard';
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

    componentWillReceiveProps(nextProps) {
        const {points} = nextProps.measure;
        points && this.renderChart(points);
    }

    renderChart(points) {
        const margin = {top: 20, right: 30, bottom: 20, left: 40},
            width = 900 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        const x = d3.scaleLinear()
            .domain([d3.min(points, d => d[0]), d3.max(points, d => d[0])])
            .range([ 0, width ]);

        const y = d3.scaleLinear()
            .domain([d3.min(points, d => d[1]), d3.max(points, d => d[1])])
            .range([ height, 0 ]);

        const brush = d3.brushX()
            .extent([[0, 0], [width, height]])
            .on("end", onBrushEnd);

        const peakLine = d3.line()
            .x(d => x(d[0]))
            .y(d => y(d[1]));

        const chart = d3.select('.MeasurePage__Chart')
            .append('svg')
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .attr('class', 'chart');

        const main = chart.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('width', width)
            .attr('height', height);

        const xAxis = d3.axisBottom()
            .scale(x);

        main.append('g')
            .attr('transform', 'translate(0,' + y(0) + ')')
            .attr('class', 'axis')
            .call(xAxis);

        const yAxis = d3.axisLeft()
            .scale(y);

        main.append('g')
            .attr('transform', 'translate(0,0)')
            .attr('class', 'axis')
            .call(yAxis);

        main.append("g")
            .selectAll("scatter-dots")
            .data(points)
            .enter()
            .append("circle")
            .attr("cx", d => x(d[0]) )
            .attr("cy", d => y(d[1]) )
            .attr("r", 1.5)
            .attr("fill", "#1abc9c");

        main.append("g")
            .attr("class", "brush")
            .call(brush);

        function onBrushEnd() {
            const selection = d3.event.selection;
            const [leftX, rightX] = selection.map(x.invert);
            const selectedPoints = points
                .filter(point => point[0] > leftX && point[0] < rightX)
                .sort((first, second) => first[1] - second[1]);
            const maxPoint = selectedPoints[selectedPoints.length - 1];
            d3.selectAll(".peakline").remove();
            main.append("path")
                .attr("class", "peakline")
                .attr("stroke", "red")
                .attr("stroke-width", 2)
                .attr("d", peakLine([[maxPoint[0], 0], maxPoint]));
        }
    }

    render() {
        return (
            <PageLayout>
                <div className="MeasurePage">
                    <VACard className="MeasurePage__ChartCard">
                        <div className="MeasurePage__Chart">
                        </div>
                    </VACard>
                </div>
            </PageLayout>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeasurePage);