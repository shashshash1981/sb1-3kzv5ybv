import { TripCosts, Calculations } from '../types';

const roundToTwo = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

export function calculateTotals(costs: TripCosts): Calculations {
  // If hours is 0, return all zeros
  if (costs.perHourHours === 0 && costs.perHourRate === 0) {
    return {
      perHourTotal: 0,
      perMileTotal: 0,
      gratTotal: 0,
      extraStopsTotal: 0,
      fuelSurchargeTotal: 0,
      discountTotal: 0,
      gstTotal: 0,
      grandTotal: 0,
      paymentsDeposits: 0,
      totalDue: 0
    };
  }

  // Add hours and decimal parts
  const totalHours = costs.perHourHours + (costs.perHourRate / 100);
  const perHourTotal = roundToTwo(totalHours * costs.perHourBaseRate); // Use custom hourly rate
  
  const perMileTotal = roundToTwo(costs.perMileRate * costs.perMileMiles);
  const subtotalBeforeGrat = roundToTwo(perHourTotal + perMileTotal);
  
  // Calculate fuel surcharge only on per hour total
  const fuelSurchargeTotal = roundToTwo((perHourTotal * costs.fuelSurcharge) / 100);
  
  const gratTotal = roundToTwo((subtotalBeforeGrat * costs.stdGrat) / 100);
  const extraStopsTotal = roundToTwo(costs.extraStopsCount * costs.extraStopsRate);
  const discountTotal = roundToTwo((subtotalBeforeGrat * costs.discount) / 100);
  
  const subtotalBeforeTax = roundToTwo(
    subtotalBeforeGrat + 
    gratTotal + 
    costs.parking + 
    costs.meetAndGreet + 
    costs.otWaitTime + 
    extraStopsTotal + 
    fuelSurchargeTotal - 
    discountTotal
  );
  
  const gstTotal = roundToTwo((subtotalBeforeTax * costs.gstTax) / 100);
  const grandTotal = roundToTwo(subtotalBeforeTax + gstTotal);
  
  return {
    perHourTotal,
    perMileTotal,
    gratTotal,
    extraStopsTotal,
    fuelSurchargeTotal,
    discountTotal,
    gstTotal,
    grandTotal,
    paymentsDeposits: 0,
    totalDue: roundToTwo(grandTotal)
  };
}