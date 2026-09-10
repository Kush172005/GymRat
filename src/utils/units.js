const KG_TO_LB = 2.20462;

export function kgToLb(kg) {
  return Math.round((kg * KG_TO_LB) * 10) / 10;
}

export function lbToKg(lb) {
  return Math.round((lb / KG_TO_LB) * 10) / 10;
}

/** Returns a clean display string: "80 kg" or "176.4 lb" */
export function formatWeight(weightKg, units) {
  if (weightKg === 0) return `0 ${units}`;
  if (units === 'lb') {
    const lb = kgToLb(weightKg);
    return `${lb % 1 === 0 ? lb.toFixed(0) : lb.toFixed(1)} lb`;
  }
  return `${weightKg % 1 === 0 ? weightKg.toFixed(0) : weightKg.toFixed(1)} kg`;
}

/** Returns only the numeric part (for input fields) */
export function displayWeight(weightKg, units) {
  if (units === 'lb') {
    const lb = kgToLb(weightKg);
    return lb % 1 === 0 ? lb.toFixed(0) : lb.toFixed(1);
  }
  return weightKg % 1 === 0 ? weightKg.toFixed(0) : weightKg.toFixed(1);
}

/** Parses a user-typed weight string into kg (for storage) */
export function parseWeightInput(value, units) {
  const parsed = parseFloat(value.replace(',', '.'));
  if (isNaN(parsed) || parsed < 0) return 0;
  return units === 'lb' ? lbToKg(parsed) : parsed;
}

export function unitLabel(units) {
  return units;
}

/** Total volume (sum of weight × reps) for display */
export function formatVolume(volumeKg, units) {
  const value = units === 'lb' ? kgToLb(volumeKg) : volumeKg;
  const rounded = Math.round(value);
  return `${rounded.toLocaleString()} ${units}`;
}

export function cmToFtIn(cm) {
  const total = cm / 2.54;
  const ft = Math.floor(total / 12);
  const inch = Math.round(total - ft * 12);
  return { ft, inch };
}

export function ftInToCm(ft, inch) {
  return Math.round((ft * 12 + inch) * 2.54);
}
