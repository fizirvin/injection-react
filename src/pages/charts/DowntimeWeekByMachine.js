import React, { Component } from 'react';
import * as d3 from 'd3';


const width = 450;
const height = 220;
const margin = {top: 30, right: 5, bottom: 20, left: 40};
const red = '#eb6a5b';
const blue = '#52b6ca';


class DownTimeWeekByMachine extends Component {
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
  .tickFormat(d => `${d}`);

  onMouseOver = (x, y, ok ) =>{
    
    d3.select('#svg_record')
    .append('text')
    .attr('x',x+2)
    .attr('y',y-5)
    .attr('class','tooltip-production')
    .text(`${ok}`)

  }

  onMouseOut = () =>{
    d3.select(".tooltip-production").remove();
  }

  componentDidMount (){
    d3.select(this.xAxisRef.current).call(this.xAxis);
    d3.select(this.yAxisRef.current).call(this.yAxis);
  

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.data) return null; // data hasn't been loaded yet so do nothing
    const {data} = nextProps;
    const { xScale, yScale } = prevState;

    // data has changed, so recalculate scale domains
    
    const max = d3.max(data, d => d.mins);
    
    yScale.domain([0, max]);
    xScale.domain(data.map(d => d.machine))
    

   

    const dataLength = data.length;
    const barPos= ((width - margin.left - margin.right) / dataLength);
    const barWidth = barPos - 1

    // calculate x and y for each rectangle
    const bars = data.map((d,i) => {
      const y1 = yScale(d.mins);
      const y2 = yScale(0);
      
      return {
        x: 40 + (i*barPos),
        y: y1,
        height: y2 - y1,
        ok: d.mins
      }
    });

    return {bars, barWidth};
  }

  componentDidUpdate() {
    d3.select(this.xAxisRef.current).call(this.xAxis);
    d3.select(this.yAxisRef.current).call(this.yAxis);
  }

  render() {
    
    return (
      <svg width={width} height={height} className='svg_model' id='svg_record'>
        {this.state.bars.map((d, i) =>
          (<rect key={i} x={d.x} y={d.y} className='bar_purge' width={this.state.barWidth} height={d.height} fill={blue}
          onMouseOut={this.onMouseOut}   
          onMouseOver={() => this.onMouseOver(d.x, d.y, d.ok )} />))}
         {this.state.bars.map((d, i) =>
          (<rect key={i} x={d.x} y={d.ng} width={this.state.barWidth} height={d.ngH} fill={red} />))}
        <g>
          <g ref={this.xAxisRef} transform={`translate(0, ${height - margin.bottom})`}/>
          <g ref={this.yAxisRef}  transform={`translate(${margin.left}, 0)`} />
        </g>
      </svg>
    );
  }
}

export default DownTimeWeekByMachine;