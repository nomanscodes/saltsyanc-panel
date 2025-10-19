// Mock API Configuration
export const mockConfig = {
  // Enable/disable mock latency
  enableLatency: true,
  
  // Latency range in milliseconds (300-800ms)
  latencyMin: 300,
  latencyMax: 800,
  
  // Enable/disable random errors for testing
  enableRandomErrors: false,
  
  // Error probability (0-1) when random errors are enabled
  errorProbability: 0.1,
};

// Helper to simulate network latency
export const simulateLatency = async (): Promise<void> => {
  if (!mockConfig.enableLatency) return;
  
  const delay = Math.floor(
    Math.random() * (mockConfig.latencyMax - mockConfig.latencyMin) + mockConfig.latencyMin
  );
  
  await new Promise(resolve => setTimeout(resolve, delay));
};

// Helper to simulate random errors
export const shouldSimulateError = (): boolean => {
  if (!mockConfig.enableRandomErrors) return false;
  return Math.random() < mockConfig.errorProbability;
};
