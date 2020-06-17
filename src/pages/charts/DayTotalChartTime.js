import React, { Component } from 'react';
import * as d3 from 'd3';

const w = parseInt(document.documentElement.clientWidth * (95/100))
const h = parseInt(document.documentElement.clientHeight * (45/100))

const width = w;
const height = h;
const margin = {top: 10, right: 5, bottom: 70, left: 50};
const red = '#eb6a5b';
const blue = '#52b6ca';



class DayTotalChartTime extends Component {
  xAxisRef = React.createRef();
  yAxisRef= React.createRef();
  state = {
    bars: [], // array of rects
    // d3 helpers
    // xScale: d3.scaleTime().range([35, 350]),
    xScale: d3.scaleTime().range([margin.left, width - margin.right]),
    // xScale: d3.scaleBand().range([margin.left, width - margin.right]),
    yScale: d3.scaleLinear().range([height - margin.bottom, margin.top])
    
  };

  xAxis = d3.axisBottom().scale(this.state.xScale).tickFormat(d3.timeFormat("%d-%b-%y"))
  yAxis = d3.axisLeft().scale(this.state.yScale)
  .tickFormat(d => `${d}`);


  // componentDidMount (){
  //   d3.select(this.xAxisRef.current).call(this.xAxis).selectAll("text").style("text-anchor", "end").attr("transform", "rotate(-90)" ).attr("dx", "-.6em").attr("dy", "-.4em");
  //   d3.select(this.yAxisRef.current).call(this.yAxis)
    
    

  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.data) return null; // data hasn't been loaded yet so do nothing
    const {data } = nextProps;
    const { xScale, yScale } = prevState;

    // data has changed, so recalculate scale domains
    const timeDomain = d3.extent(data, d => {
      const date = new Date(d.date)
      return date
    });

    const okMax = d3.max(data, d => d.ok);
    const ngMax = d3.max(data, d => d.ng)
    const max = okMax + ngMax
    
    yScale.domain([0, max]);
    xScale.domain(timeDomain);
    
    

   

    const dataLength = data.length;
    const barPos= ((width - margin.left - margin.right) / dataLength);
    const barWidth = barPos - 1
    
    // calculate x and y for each rectangle
    const bars = data.map((d,i) => {
      const y1 = yScale(d.ok);
      const y2 = yScale(0);
      const y3 = yScale(d.ng)

      const date = new Date(d.date)
      return {
        x: xScale(date),
        y: y1,
        height: y2 - y1,
        // fill: colors(colorScale(d.avg)),
        ng: y1 -(y2-y3), //y3,
        ngH: y2 - y3, //y2 - y3
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
      <svg width={width} height={height} className='svg_record'>
        {this.state.bars.map((d, i) =>
          (<rect key={i} x={d.x} y={d.y} width={'20'} height={d.height} fill={blue} />))}
         {this.state.bars.map((d, i) =>
          (<rect key={i} x={d.x} y={d.ng} width={'20'} height={d.ngH} fill={red} />))}
        <g>
          <g ref={this.xAxisRef} transform={`translate(0, ${height - margin.bottom})`}/>
          <g ref={this.yAxisRef}  transform={`translate(${margin.left}, 0)`} />
        </g>
      </svg>
    );
  }
}

export default DayTotalChartTime;