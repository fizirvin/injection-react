import React, { Component } from 'react';
import * as d3 from 'd3';


const width = 400;
const height = 110;
const margin = {top: 3, right: 5, bottom: 17, left: 35};

const blue = '#52b6ca';


class DowntimeBar extends Component {
  xAxisRef = React.createRef();
  yAxisRef= React.createRef();
  state = {
    bars: [], // array of rects
    // d3 helpers
    // xScale: d3.scaleTime().range([35, 350]),
    xScale: d3.scaleBand().range([margin.left, width - margin.right]),
    yScale: d3.scaleLinear().range([height - margin.bottom, margin.top])
  };

  xAxis = d3.axisBottom().scale(this.state.xScale)
  .ticks(7)
  yAxis = d3.axisLeft().scale(this.state.yScale)
  .tickFormat(d => `${d}`)
  .ticks(5)


  componentDidMount (){
    d3.select(this.xAxisRef.current).call(this.xAxis);
    d3.select(this.yAxisRef.current).call(this.yAxis);

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.data) return null; // data hasn't been loaded yet so do nothing
    const {data} = nextProps;
    const {xScale, yScale} = prevState;

    // data has changed, so recalculate scale domains
    
    const max = d3.max(data, d => d.mins);
    
    yScale.domain([0, max]);
    xScale.domain(data.map(d => d.day))
    


    const dataLength = data.length;
    const barPos= ((width - margin.left - margin.right) / dataLength);
    const barWidth = barPos - 1

    // calculate x and y for each rectangle
    const bars = data.map((d,i) => {
      const y1 = yScale(d.mins);
      const y2 = yScale(0);
      return {
        x: 35 + (i*barPos),
        y: y1,
        height: y2 - y1,
        
      }
    });

    return {bars, barWidth};
  }

  componentDidUpdate() {
    d3.select(this.xAxisRef.current).call(this.xAxis);
    d3.select(this.yAxisRef.current).call(this.yAxis).style("font-size", "70%");
  }

  render() {
    
    return (
      <svg width={width} height={height} className='svg_downtime'>
        {this.state.bars.map((d, i) =>
          (<rect key={i} x={d.x} y={d.y} width={this.state.barWidth} height={d.height} fill={blue} />))}
        <g>
          <g ref={this.xAxisRef} transform={`translate(0, ${height - margin.bottom})`} />
          <g ref={this.yAxisRef}  transform={`translate(${margin.left}, 0)`} />
        </g>
      </svg>
    );
  }
}

export default DowntimeBar;