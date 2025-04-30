import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="reports-container" role="main">
      <h1>Report : Benefits of Solar-Powered Trains</h1>
      
      <div class="chart-container" #chartContainer>
        <!-- D3.js pie chart will be rendered here -->
      </div>

      <section class="chart-description" aria-labelledby="description-heading">
        <h2 id="description-heading">Chart Description</h2>
        <p>
          This chart presents the key benefits of implementing solar-powered trains. The visualization shows the relative importance of various advantages, including environmental impact, cost savings, energy independence, and reduced maintenance. The data helps stakeholders understand the value proposition of solar-powered trains and their potential contribution to sustainable transportation.
        </p>
        <p>
          Data source: Analysis based on operational data from existing solar-powered train implementations and environmental impact studies.
        </p>
      </section>
    </div>
  `,
  styles: [`
    .reports-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
    }
    h1 {
      color: #2c3e50;
      margin-bottom: 2rem;
      text-align: center;
    }
    .chart-container {
      width: 100%;
      height: 400px;
      margin: 2rem 0;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      overflow: visible;
      justify-content: center;
    }
    .chart-description {
      margin-top: 2rem;
      padding: 1.5rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #34495e;
      margin-bottom: 1rem;
    }
    p {
      line-height: 1.6;
      color: #333;
      margin-bottom: 1rem;
    }
  `]
})
export class ReportsComponent implements AfterViewInit {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  constructor(private dataService: DataService) {}

  ngAfterViewInit() {
    this.dataService.getBenefits()
      .then((response) => {
        this.createChart(response);
      })
      .catch((error) => {
        console.error('Error fetching benefits:', error);
        // Fallback to static data if API fails
    
      });
  }

  private createChart(data: any[]) {
    const width = 1000;
    const height = 400;
    const radius = Math.min(width, height) / 2;
  
    const container = d3.select(this.chartContainer.nativeElement);
    container.select('svg').remove();
  
    const svg = container
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
  
    const color = d3.scaleOrdinal<string>()
      .domain(data.map(d => d.benefit_type))
      .range(d3.schemeCategory10);
  
    const pie = d3.pie<{ benefit_type: string; percentage: number }>()
      .value(d => d.percentage)
      .sort(null); // Important: keeps original order
  
    const arc = d3.arc<d3.PieArcDatum<{ benefit_type: string; percentage: number }>>()
      .innerRadius(0)
      .outerRadius(radius - 10); // Little padding inside
  
    const outerArc = d3.arc<d3.PieArcDatum<{ benefit_type: string; percentage: number }>>()
      .innerRadius(radius * 0.8)
      .outerRadius(radius * 0.8); // For placing labels nicely
  
    const arcs = svg.selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');
  
    // Draw pie slices
    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.benefit_type))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .on('mouseover', function (event, d) {
        tooltip
          .style('opacity', 1)
          .html(`<strong>${d.data.benefit_type}</strong><br/>${d.data.percentage}%`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });
  
    // Draw polylines between chart and labels
    arcs.append('polyline')
  .attr('stroke', 'black')
  .attr('fill', 'none')
  .attr('stroke-width', 1)
  .attr('points', d => {
    const posA = arc.centroid(d); // Center of slice
    const posB = outerArc.centroid(d); // Just outside the slice
    const posC = outerArc.centroid(d); // Place where label will be
    const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
    posC[0] = radius * 0.85 * (midAngle < Math.PI ? 1 : -1); // Move left or right

    // Return points as a formatted string
    return [posA, posB, posC].map(point => point.join(',')).join(' ');
  });

  
    // Add labels
    arcs.append('text')
      .text(d => `${d.data.benefit_type}:${d.data.percentage}%`)
      .attr('transform', d => {
        const pos = outerArc.centroid(d);
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.9 * (midAngle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      })
      .style('text-anchor', d => {
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midAngle < Math.PI ? 'start' : 'end';
      })
      .attr('font-size', '15px');
  
    // Tooltip div
    const tooltip = container
      .append('div')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('border', '1px solid #ccc')
      .style('padding', '5px 10px')
      .style('border-radius', '5px')
      .style('pointer-events', 'none')
      .style('opacity', 0);
  }
  
  
}
