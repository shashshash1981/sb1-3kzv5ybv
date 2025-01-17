import React from 'react';
import { CustomerForm } from '../forms/CustomerForm';
import { MeetGreetForm } from '../forms/MeetGreetForm';
import { useCustomerInfo } from '../../hooks/useCustomerInfo';

export function CustomerInfoTab() {
  const { 
    formData, 
    updateCustomerInfo, 
    updateMeetGreetInfo,
    saveMeetAndGreetDetails,
    resetForm 
  } = useCustomerInfo();

  return (
    <div className="space-y-8">
      <CustomerForm 
        data={formData.customer}
        onChange={updateCustomerInfo}
      />
      <MeetGreetForm 
        data={formData.meetAndGreet}
        onChange={updateMeetGreetInfo}
        onSave={saveMeetAndGreetDetails}
        onReset={resetForm}
      />
    </div>
  );
}