import { useState } from 'react';
import { CustomerFormData, CustomerInfo, MeetGreetInfo } from '../types/customer';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const initialCustomerInfo: CustomerInfo = {
  fullName: '',
  email: '',
  address: '',
  phone: '',
  pickupAddress: '',
  dropoffAddress: '',
  notes: '',
};

const initialMeetGreetInfo: MeetGreetInfo = {
  airlineAndFlight: '',
  arrivalTime: '',
  passengerCount: 1,
  luggageCount: 0,
  specialNotes: '',
};

export function useCustomerInfo() {
  const [formData, setFormData] = useState<CustomerFormData>({
    customer: initialCustomerInfo,
    meetAndGreet: initialMeetGreetInfo,
  });

  const updateCustomerInfo = (updates: Partial<CustomerInfo>) => {
    setFormData(prev => ({
      ...prev,
      customer: { ...prev.customer, ...updates },
    }));
  };

  const updateMeetGreetInfo = (updates: Partial<MeetGreetInfo>) => {
    setFormData(prev => ({
      ...prev,
      meetAndGreet: { ...prev.meetAndGreet, ...updates },
    }));
  };

  const validateCustomerData = (data: CustomerInfo): string | null => {
    if (!data.fullName.trim()) return 'Full name is required';
    if (!data.email.trim()) return 'Email is required';
    if (!data.phone.trim()) return 'Phone number is required';
    if (!data.pickupAddress.trim()) return 'Pickup address is required';
    if (!data.dropoffAddress.trim()) return 'Drop-off address is required';

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(data.email)) return 'Invalid email format';

    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneRegex.test(data.phone)) return 'Phone number must be in format: XXX-XXX-XXXX';

    return null;
  };

  const validateMeetGreetData = (data: MeetGreetInfo): string | null => {
    if (data.passengerCount < 1) return 'Number of passengers must be at least 1';
    if (data.luggageCount < 0) return 'Number of luggage items cannot be negative';
    return null;
  };

  const saveMeetAndGreetDetails = async () => {
    try {
      const customerValidationError = validateCustomerData(formData.customer);
      if (customerValidationError) {
        toast.error(customerValidationError);
        return;
      }

      const meetGreetValidationError = validateMeetGreetData(formData.meetAndGreet);
      if (meetGreetValidationError) {
        toast.error(meetGreetValidationError);
        return;
      }

      // Transform the data to match database column names
      const customerData = {
        fullname: formData.customer.fullName,
        email: formData.customer.email,
        address: formData.customer.address,
        phone: formData.customer.phone,
        pickupaddress: formData.customer.pickupAddress,
        dropoffaddress: formData.customer.dropoffAddress,
        notes: formData.customer.notes,
      };

      // First, save customer information
      const { data: savedCustomer, error: customerError } = await supabase
        .from('customers')
        .insert([customerData])
        .select()
        .single();

      if (customerError) {
        throw new Error(customerError.message);
      }

      // Transform meet & greet data to match database column names
      const meetGreetData = {
        customer_id: savedCustomer.id,
        airline_flight: formData.meetAndGreet.airlineAndFlight,
        arrival_time: formData.meetAndGreet.arrivalTime,
        passenger_count: formData.meetAndGreet.passengerCount,
        luggage_count: formData.meetAndGreet.luggageCount,
        special_notes: formData.meetAndGreet.specialNotes,
      };

      // Then, save meet & greet details
      const { error: meetGreetError } = await supabase
        .from('meet_greet_details')
        .insert([meetGreetData]);

      if (meetGreetError) {
        throw new Error(meetGreetError.message);
      }

      toast.success('Meet & Greet details saved successfully');
      resetForm(); // Reset form after successful save
    } catch (error: any) {
      console.error('Error saving meet & greet details:', error);
      toast.error(error.message || 'Failed to save meet & greet details');
    }
  };

  const resetForm = () => {
    setFormData({
      customer: initialCustomerInfo,
      meetAndGreet: initialMeetGreetInfo,
    });
    toast.success('Form reset successfully');
  };

  return {
    formData,
    updateCustomerInfo,
    updateMeetGreetInfo,
    saveMeetAndGreetDetails,
    resetForm,
  };
}