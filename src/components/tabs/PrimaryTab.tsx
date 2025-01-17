import React from 'react';
import { CostInputField } from '../CostInputField';
import { TotalSection } from '../TotalSection';
import { CalculationDisplay } from '../CalculationDisplay';
import { TripCosts } from '../../types';
import { Save, RefreshCw, Calculator } from 'lucide-react';

interface PrimaryTabProps {
  costs: TripCosts;
  calculations: any;
  onInputChange: (field: keyof TripCosts, value: string) => void;
  onCurrencyChange: (value: string) => void;
  onSave: () => Promise<void>;
  onReset: () => void;
  onCalculate: () => void;
}

export function PrimaryTab({
  costs,
  calculations,
  onInputChange,
  onCurrencyChange,
  onSave,
  onReset,
  onCalculate
}: PrimaryTabProps) {
  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onCalculate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md 
            hover:bg-blue-700 dark:bg-dark-brand-blue dark:hover:bg-blue-700"
        >
          <Calculator size={16} />
          Calculate
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md 
            hover:bg-gray-300 dark:bg-dark-bg-tertiary dark:text-dark-text-primary 
            dark:hover:bg-dark-interactive-hover"
        >
          <RefreshCw size={16} />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hourly Rate Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text-primary">
            Hourly Rate Calculation
          </h3>
          <CostInputField
            label="Base Rate per Hour"
            value={costs.perHourBaseRate}
            onChange={(value) => onInputChange('perHourBaseRate', value)}
            suffix="$/hr"
          />
          <CostInputField
            label="Hours"
            value={costs.perHourHours}
            onChange={(value) => onInputChange('perHourHours', value)}
            suffix="hrs"
          />
          <CostInputField
            label="Minutes"
            value={costs.perHourRate}
            onChange={(value) => onInputChange('perHourRate', value)}
            suffix="min"
          />
          <div className="pt-2">
            <CostInputField
              label="Total Hourly"
              value={0}
              onChange={() => {}}
              calculation={calculations.perHourTotal}
              textColor="text-blue-600 dark:text-dark-brand-blue"
            />
          </div>
        </div>

        {/* Mileage Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text-primary">
            Mileage Calculation
          </h3>
          <CostInputField
            label="Rate per Mile"
            value={costs.perMileRate}
            onChange={(value) => onInputChange('perMileRate', value)}
            suffix="$/mile"
          />
          <CostInputField
            label="Total Miles"
            value={costs.perMileMiles}
            onChange={(value) => onInputChange('perMileMiles', value)}
            suffix="miles"
          />
          <div className="pt-2">
            <CostInputField
              label="Total Mileage"
              value={0}
              onChange={() => {}}
              calculation={calculations.perMileTotal}
              textColor="text-blue-600 dark:text-dark-brand-blue"
            />
          </div>
        </div>
      </div>

      {/* Additional Charges Section */}
      <div className="space-y-4 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text-primary">
          Additional Charges
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <CostInputField
              label="Standard Gratuity (%)"
              value={costs.stdGrat}
              onChange={(value) => onInputChange('stdGrat', value)}
              suffix="%"
            />
            <CalculationDisplay
              label="Gratuity Amount"
              value={calculations.gratTotal}
              currency={costs.currency}
            />
            <CostInputField
              label="Parking Fees"
              value={costs.parking}
              onChange={(value) => onInputChange('parking', value)}
              suffix="$"
            />
            <CostInputField
              label="Meet & Greet"
              value={costs.meetAndGreet}
              onChange={(value) => onInputChange('meetAndGreet', value)}
              suffix="$"
            />
          </div>
          <div className="space-y-4">
            <CostInputField
              label="Overtime Wait Time"
              value={costs.otWaitTime}
              onChange={(value) => onInputChange('otWaitTime', value)}
              suffix="$"
            />
            <CostInputField
              label="Extra Stops Count"
              value={costs.extraStopsCount}
              onChange={(value) => onInputChange('extraStopsCount', value)}
            />
            <CostInputField
              label="Rate per Extra Stop"
              value={costs.extraStopsRate}
              onChange={(value) => onInputChange('extraStopsRate', value)}
              suffix="$"
            />
            <CalculationDisplay
              label="Extra Stops Total"
              value={calculations.extraStopsTotal}
              currency={costs.currency}
            />
          </div>
        </div>
      </div>

      {/* Adjustments Section */}
      <div className="space-y-4 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text-primary">
          Adjustments
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <CostInputField
              label="Fuel Surcharge (%)"
              value={costs.fuelSurcharge}
              onChange={(value) => onInputChange('fuelSurcharge', value)}
              suffix="%"
            />
            <CalculationDisplay
              label="Fuel Surcharge Amount"
              value={calculations.fuelSurchargeTotal}
              currency={costs.currency}
            />
          </div>
          <div className="space-y-4">
            <CostInputField
              label="Discount (%)"
              value={costs.discount}
              onChange={(value) => onInputChange('discount', value)}
              suffix="%"
            />
            <CalculationDisplay
              label="Discount Amount"
              value={calculations.discountTotal}
              currency={costs.currency}
            />
          </div>
        </div>
        <div className="space-y-4">
          <CostInputField
            label="GST/HST Tax (%)"
            value={costs.gstTax}
            onChange={(value) => onInputChange('gstTax', value)}
            suffix="%"
          />
          <CalculationDisplay
            label="Tax Amount"
            value={calculations.gstTotal}
            currency={costs.currency}
          />
        </div>
      </div>

      {/* Totals Section */}
      <TotalSection
        costs={costs}
        calculations={calculations}
        onCurrencyChange={onCurrencyChange}
      />

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t dark:border-dark-border-default">
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md 
            hover:bg-blue-700 dark:bg-dark-brand-blue dark:hover:bg-blue-700"
        >
          <Save size={16} />
          Save Calculations
        </button>
      </div>
    </div>
  );
}