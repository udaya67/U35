import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api'; // Your API URL

  constructor() {}

  // Fetch data from /challenges endpoint
  async getChallenges() {
    try {
      const response = await axios.get(`${this.apiUrl}/challenges`);
      console.log('Challenges Data:', response.data); // Log the response data
      return response.data; // Return the data to the component
    } catch (error) {
      console.error('Error fetching challenges:', error);
      throw error; // Handle errors
    }
  }

  // Fetch data from /benefits endpoint
  async getBenefits() {
    try {
      const response = await axios.get(`${this.apiUrl}/benefits`);
      console.log('Benefits Data:', response.data); // Log the response data
      return response.data; // Return the data to the component
    } catch (error) {
      console.error('Error fetching benefits:', error);
      throw error; // Handle errors
    }
  }
}
