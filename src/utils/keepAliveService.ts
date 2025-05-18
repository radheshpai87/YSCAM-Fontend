import axios from 'axios';

// API URL from environment, same as in api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://yscam-api.onrender.com';

/**
 * Service to keep the Render API awake during active user sessions
 * This helps prevent the API from going to sleep mode while users are actively using the app
 */
class KeepAliveService {
  private intervalId: number | null = null;
  private pingInterval = 4 * 60 * 1000; // 4 minutes (just under Render's 5 minute sleep threshold)
  private isActive = false;
  private lastPingTime = 0;

  /**
   * Start the keep-alive service that will periodically ping the API
   * to prevent it from going to sleep during active user sessions
   */
  start(): void {
    if (this.isActive) return;

    this.isActive = true;
    this.lastPingTime = Date.now();
    
    // Initial ping
    this.pingServer();
    
    // Set up interval for regular pings
    this.intervalId = window.setInterval(() => {
      this.pingServer();
    }, this.pingInterval);
    
    // Log that the service has started
    console.info('Keep-alive service started for API server');
  }

  /**
   * Stop the keep-alive service
   */
  stop(): void {
    if (!this.isActive) return;
    
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.isActive = false;
    console.info('Keep-alive service stopped for API server');
  }
  
  /**
   * Ping the server to keep it awake
   */
  private async pingServer(): Promise<void> {
    try {
      // Use a lightweight HEAD request to minimize bandwidth usage
      await axios.head(`${API_BASE_URL}/`, { 
        timeout: 5000 // Short timeout
      });
      
      this.lastPingTime = Date.now();
      console.debug('Keep-alive ping sent to API server');
    } catch {
      console.warn('Failed to send keep-alive ping to API server');
    }
  }
  
  /**
   * Check if the service is currently active
   */
  isRunning(): boolean {
    return this.isActive;
  }
  
  /**
   * Get time since last successful ping
   */
  getTimeSinceLastPing(): number {
    return Date.now() - this.lastPingTime;
  }
}

// Export a singleton instance
export const keepAliveService = new KeepAliveService();
