import React, { Component } from 'react';
import * as d3 from 'd3';

const w = parseInt(document.documentElement.clientWidth * (95/100))
const h = parseInt(document.documentElement.clientHeight * (45/100))

const width = w;
const height = h;
const margin = {top: 30, right: 20, bottom: 70, left: 50};

const blue = '#52b6ca';



class WeekPurgeChart extends Component {
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
  yAxis = d3.axisLeft().scale(this.state.yScale)
  .tickFormat(d => `${d}`);

  onMouseOver = (purge, x, y, date) =>{
    
    d3.select('#svg_record')
    .append('text')
    .attr('x',x+2)
    .attr('y',y-20)
    .attr('class','tooltip')
    .text(`${date}`)
    .append('tspan')
    .attr("dx", '-5em')
    .attr("dy", "1.2em")
    .text(`purge: ${purge} g`)

  }

  onMouseOut = () =>{
    d3.select(".tooltip").remove();
  }


  componentDidMount (){
    d3.select(this.xAxisRef.current).call(this.xAxis).selectAll("text").style("text-anchor", "end").attr("transform", "rotate(-90)" ).attr("dx", "-.6em").attr("dy", "-.4em");
    d3.select(this.yAxisRef.current).call(this.yAxis)
    
    

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.data) return null; // data hasn't been loaded yet so do nothing
    const {data } = nextProps;
    const { xScale, yScale } = prevState;

    // data has changed, so recalculate scale domains
  
    const max = d3.max(data, d => d.purge)
    
    yScale.domain([0, max]);
    xScale.domain(data.map(d => d.week))
    

    const dataLength = data.length;
    const barPos= ((width - margin.left - margin.right) / dataLength);
    const barWidth = barPos - 1
    
    // calculate x and y for each rectangle
    const bars = data.map((d,i) => {
      const y1 = yScale(d.purge);
      const y2 = yScale(0);
      
      return {
        x: 50 + (i*barPos),
        y: y1,
        height: y2 - y1,
        purge: d.purge,
        date: d.week
        
      }
    });

    return {bars, barWidth};
  }

  componentDidUpdate() {
    d3.select(this.xAxisRef.current).call(this.xAxis).selectAll("text").style("text-anchor", "end").attr("transform", "rotate(-90)" ).attr("dx", "-.6em").attr("dy", "-.4em");
    d3.select(this.yAxisRef.current).call(this.yAxis)
   

  }

  render() {
    
    return (
      <svg width={width} height={height} className='svg_record' id='svg_record'>
        {this.state.bars.map((d, i) =>
          (<rect key={i} x={d.x} y={d.y} className='bar_purge' width={this.state.barWidth} height={d.height} fill={blue} 
            onMouseOut={this.onMouseOut}   
            onMouseOver={() => this.onMouseOver(d.purge, d.x, d.y, d.date)}/>))}
         
        <g>
          <g ref={this.xAxisRef} transform={`translate(0, ${height - margin.bottom})`}/>
          <g ref={this.yAxisRef}  transform={`translate(${margin.left}, 0)`} />
        </g>
      </svg>
    );
  }
}

export default WeekPurgeChart;