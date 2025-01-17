import React from 'react';
import { CustomerInfo } from '../../types/customer';
import { FormField } from '../ui/FormField';
import { Save, RefreshCw } from 'lucide-react';
import { useCustomerInfo } from '../../hooks/useCustomerInfo';
import toast from 'react-hot-toast';

interface CustomerFormProps {
  data: CustomerInfo;
  onChange: (data: Partial<CustomerInfo>) => void;
}

export function CustomerForm({ data, onChange }: CustomerFormProps) {
  const { saveCustomer, resetForm } = useCustomerInfo();

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!data.fullName || !data.email || !data.phone || !data.pickupAddress || !data.dropoffAddress) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Validate email format
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(data.email)) {
        toast.error('Please enter a valid email address');
        return;
      }

      // Validate phone format
      const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
      if (!phoneRegex.test(data.phone)) {
        toast.error('Please enter phone number in XXX-XXX-XXXX format');
        return;
      }

      await saveCustomer(data);
      toast.success('Customer information saved successfully');
    } catch (error) {
      toast.error('Failed to save customer information');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-dark-text-primary">
        Main Customer Information
      </h2>
      
      <FormField
        label="Full Name"
        required
        type="text"
        value={data.fullName}
        onChange={(value) => onChange({ fullName: value })}
      />

      <FormField
        label="Email"
        required
        type="email"
        value={data.email}
        onChange={(value) => onChange({ email: value })}
      />

      <FormField
        label="Primary Contact Address"
        type="text"
        value={data.address}
        onChange={(value) => onChange({ address: value })}
      />

      <FormField
        label="Phone Number"
        required
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        placeholder="XXX-XXX-XXXX"
        value={data.phone}
        onChange={(value) => onChange({ phone: value })}
      />

      <FormField
        label="Pick-up Location"
        required
        type="text"
        value={data.pickupAddress}
        onChange={(value) => onChange({ pickupAddress: value })}
      />

      <FormField
        label="Drop-off Location"
        required
        type="text"
        value={data.dropoffAddress}
        onChange={(value) => onChange({ dropoffAddress: value })}
      />

      <FormField
        label="General Notes"
        type="textarea"
        value={data.notes}
        onChange={(value) => onChange({ notes: value })}
      />

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-dark-brand-blue dark:hover:bg-blue-700"
        >
          <Save size={16} />
          Save
        </button>
        <button
          onClick={resetForm}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 dark:bg-dark-bg-tertiary dark:text-dark-text-primary dark:hover:bg-dark-interactive-hover"
        >
          <RefreshCw size={16} />
          Reset
        </button>
      </div>
    </div>
  );
}