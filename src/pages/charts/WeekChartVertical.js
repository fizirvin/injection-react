import React, { Component } from 'react';
import * as d3 from 'd3';


const width = 300;
const height = 400;
const margin = {top: 20, right: 15, bottom: 20, left: 85};
const red = '#eb6a5b';
const blue = '#52b6ca';


class WeekChart extends Component {
  xAxisRef = React.createRef();
  yAxisRef= React.createRef();
  state = {
    bars: [], // array of rects
    // d3 helpers
    // xScale: d3.scaleTime().range([35, 350]),
    yScale: d3.scaleBand().range([height - margin.bottom, margin.top]),
    xScale: d3.scaleLinear().range([margin.left, width - margin.right]),
    colorScale: d3.scaleLinear(),
  };

  yAxis = d3.axisLeft().scale(this.state.yScale)
  .ticks(7)
  xAxis = d3.axisBottom().scale(this.state.xScale)
  .tickFormat(d => `${d}`);

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.data) return null; // data hasn't been loaded yet so do nothing
    const {data} = nextProps;
    const {xScale, yScale, colorScale} = prevState;

    // data has changed, so recalculate scale domains
    
    const okMax = d3.max(data, d => d.ok);
    const ngMax = d3.max(data, d => d.ng)
    const max = okMax + ngMax
    const colorDomain = d3.extent(data, d => d.avg);
    xScale.domain([0, max]);
    yScale.domain(data.map(d => d.part))
    colorScale.domain(colorDomain);

    // calculate x and y for each rectangle
    const bars = data.map((d,i) => {
      const y1 = yScale(d.ok);
      const y2 = yScale(0);
      const y3 = yScale(d.ng)
      return {
        x: 35 + (i*51),
        y: y1,
        height: y2 - y1,
        // fill: colors(colorScale(d.avg)),
        ng: y1 -(y2-y3), //y3,
        ngH: y2 - y3, //y2 - y3
      }
    });

    return {bars};
  }

  componentDidUpdate() {
    d3.select(this.xAxisRef.current).call(this.xAxis);
    d3.select(this.yAxisRef.current).call(this.yAxis);
  }

  render() {
    
    return (
      <svg width={width} height={height} className='svg_model2'>
        {/* {this.state.bars.map((d, i) =>
          (<rect key={i} x={d.x} y={d.y} width='50' height={d.height} fill={blue} />))}
         {this.state.bars.map((d, i) =>
          (<rect key={i} x={d.x} y={d.ng} width='50' height={d.ngH} fill={red} />))} */}
        <g>
          <g ref={this.xAxisRef} transform={`translate(0, ${height - margin.bottom})`} />
          <g ref={this.yAxisRef}  transform={`translate(${margin.left}, 0)`} />
        </g>
      </svg>
    );
  }
}

export default WeekChart;