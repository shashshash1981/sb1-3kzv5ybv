import React from 'react';
import { MeetGreetInfo } from '../../types/customer';
import { FormField } from '../ui/FormField';
import { Save, RefreshCw } from 'lucide-react';

interface MeetGreetFormProps {
  data: MeetGreetInfo;
  onChange: (data: Partial<MeetGreetInfo>) => void;
  onSave: () => Promise<void>;
  onReset: () => void;
}

export function MeetGreetForm({ data, onChange, onSave, onReset }: MeetGreetFormProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-dark-text-primary">
        Meet & Greet Details
      </h2>

      <FormField
        label="Airline & Flight Number"
        type="text"
        placeholder="e.g., AC - AC123"
        value={data.airlineAndFlight}
        onChange={(value) => onChange({ airlineAndFlight: value })}
      />

      <FormField
        label="Arrival Time"
        type="time"
        value={data.arrivalTime}
        onChange={(value) => onChange({ arrivalTime: value })}
      />

      <FormField
        label="Number of Passengers"
        type="number"
        min="1"
        value={data.passengerCount}
        onChange={(value) => onChange({ passengerCount: parseInt(value) })}
      />

      <FormField
        label="Number of Luggage Items"
        type="number"
        min="0"
        value={data.luggageCount}
        onChange={(value) => onChange({ luggageCount: parseInt(value) })}
      />

      <FormField
        label="Special Notes"
        type="textarea"
        value={data.specialNotes}
        onChange={(value) => onChange({ specialNotes: value })}
      />

      <div className="flex gap-4">
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-dark-brand-blue dark:hover:bg-blue-700"
        >
          <Save size={16} />
          Save Meet & Greet Details
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 dark:bg-dark-bg-tertiary dark:text-dark-text-primary dark:hover:bg-dark-interactive-hover"
        >
          <RefreshCw size={16} />
          Reset
        </button>
      </div>
    </div>
  );
}