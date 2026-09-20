export interface Instrument {
  symbol: string;
  name: string;
  base: number;
  // Whether this underlying has a simulated options chain available.
  hasOptions?: boolean;
  optionStep?: number; // strike spacing
  lotSize?: number; // shares/units per option lot
}

export const INSTRUMENTS: Instrument[] = [
  { symbol: 'NIFTY 50', name: 'Nifty 50 Index', base: 24800, hasOptions: true, optionStep: 50, lotSize: 65 },
  { symbol: 'RELIANCE', name: 'Reliance Industries', base: 2940, hasOptions: true, optionStep: 20, lotSize: 250 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', base: 4150, hasOptions: true, optionStep: 50, lotSize: 175 },
  { symbol: 'INFY', name: 'Infosys', base: 1850, hasOptions: true, optionStep: 20, lotSize: 400 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', base: 1680, hasOptions: true, optionStep: 20, lotSize: 550 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', base: 1265, hasOptions: false },
];
