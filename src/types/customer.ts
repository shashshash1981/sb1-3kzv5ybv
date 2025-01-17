export interface CustomerInfo {
  fullName: string;
  email: string;
  address: string;
  phone: string;
  pickupAddress: string;
  dropoffAddress: string;
  notes: string;
}

export interface MeetGreetInfo {
  airlineAndFlight: string;
  arrivalTime: string;
  passengerCount: number;
  luggageCount: number;
  specialNotes: string;
}

export interface CustomerFormData {
  customer: CustomerInfo;
  meetAndGreet: MeetGreetInfo;
}