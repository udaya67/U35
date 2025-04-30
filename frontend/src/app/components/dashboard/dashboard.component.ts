import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container" role="main">
      <h1>Solar-Powered Trains: A Sustainable Future</h1>
      
      <section class="Description" aria-labelledby="summary-heading">
        <h2 id="summary-heading">Summary</h2>
        <p>
          Solar-powered trains represent a revolutionary step in sustainable transportation. These innovative vehicles harness the sun's energy through photovoltaic cells installed on their roofs or at stations, converting sunlight into electricity to power their operations. The technology offers numerous environmental benefits, including reduced carbon emissions and decreased reliance on fossil fuels.
        </p>
        <p>
          The implementation of solar-powered trains faces various challenges, such as initial infrastructure costs and weather dependency. However, advancements in solar technology and energy storage solutions are making these challenges increasingly manageable. Countries like India and Australia have already implemented solar-powered trains, demonstrating the technology's viability and potential for widespread adoption.
        </p>
        <p>
          The future of solar-powered trains looks promising, with ongoing research and development focusing on improving efficiency and reducing costs. As global efforts to combat climate change intensify, solar-powered trains could play a crucial role in creating a more sustainable transportation network.
        </p>
      </section>

      <section class="source" aria-labelledby="source-heading">
        <h2 id="source-heading">Source</h2>
        <p>
          Information sourced from: 
          <a href="https://solgenpower.com/about-us/faqs/solar-terms/solar-powered-train/" target="_blank" rel="noopener noreferrer">
            Solgen Power - Solar-Powered Train
          </a>
        </p>
      </section>

      <section class="tech-stack" aria-labelledby="tech-heading">
        <h2 id="tech-heading">Technical Implementation</h2>
        <p>
          This application is built using Angular 17, a modern web framework that enables the creation of dynamic, responsive single-page applications. The frontend utilizes D3.js for data visualization, creating interactive charts that display solar energy statistics and environmental impact data. The application follows ADA/WCAG accessibility guidelines, ensuring an inclusive user experience. The architecture employs a component-based structure with standalone components, reactive forms for user input, and a service-based approach for data management. The application communicates with a backend API running on port 3000, while the frontend is served on the standard HTTP port 80.
        </p>
      </section>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    h1 {
      color: #2c3e50;
      margin-bottom: 2rem;
      text-align: center;
    }
    h2 {
      color: #34495e;
      margin: 1.5rem 0 1rem;
    }
    section {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    p {
      line-height: 1.6;
      color: #333;
      margin-bottom: 1rem;
    }
    a {
      color: #3498db;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  `]
})
export class DashboardComponent {} 