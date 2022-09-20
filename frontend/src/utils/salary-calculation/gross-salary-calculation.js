import { round } from "mathjs";

const GrossSalaryCalculation = (grossSalary) => {
  let netSalary = 0;
  let taxSalary = 0;
  let contribute = 0;

  if (grossSalary > 0 && grossSalary <= 84.21) {
    taxSalary = 0;
    contribute = (grossSalary * 5) / 100;
    netSalary = grossSalary - contribute;
  } else if (grossSalary > 84.21 && grossSalary <= 263.16) {
    contribute = (grossSalary * 5) / 100;
    taxSalary = ((grossSalary - contribute - 80) * 4) / 100;
    netSalary = grossSalary - contribute - taxSalary;
  } else if (grossSalary > 263.16 && grossSalary <= 473.68) {
    contribute = (grossSalary * 5) / 100;
    taxSalary = ((grossSalary - contribute - 250) * 8) / 100;
    taxSalary += 6.8;
    netSalary = grossSalary - contribute - taxSalary;
  } else if (grossSalary > 473.68) {
    contribute = (grossSalary * 5) / 100;
    taxSalary = ((grossSalary - contribute - 450) * 10) / 100;
    taxSalary += 22.8;
    netSalary = grossSalary - contribute - taxSalary;
  }

  netSalary = round(netSalary, 2);
  taxSalary = round(taxSalary, 2);
  contribute = round(contribute, 2);

  return { netSalary, taxSalary, contribute };
};

const isPrimaryGrossSalary = (grossSalary, isPrimary) => {
    if (isPrimary) {
        return GrossSalaryCalculation(grossSalary);
    } else {
        let taxSalary = 0;
        let contribute = 0;
        let netSalary = 0;
        contribute = (grossSalary * 5) / 100;
        taxSalary = (grossSalary - contribute) * 10 / 100;
        netSalary = grossSalary - contribute - taxSalary;
    }
};


export default GrossSalaryCalculation;
