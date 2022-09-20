import { round } from "mathjs";

const NetSalaryCalculation = (netSalary) => {
  let grossSalary = 0;
  let taxSalary = 0;
  let contribute = 0;
  if (netSalary > 0 && netSalary <= 80) {
    contribute = (netSalary * 5) / 95;
    grossSalary = netSalary + contribute;
    taxSalary = 0;
  } else if (netSalary > 80 && netSalary <= 243.2) {
    taxSalary = ((netSalary - 80) * 4) / 96;
    contribute = ((netSalary + taxSalary) * 5) / 95;
    grossSalary = netSalary + contribute + taxSalary;
  } else if (netSalary > 243.2 && netSalary <= 427.2) {
    taxSalary = ((netSalary - 243.2) * 8) / 92;
    taxSalary += 6.8;
    contribute = ((netSalary + taxSalary) * 5) / 95;
    grossSalary = netSalary + contribute + taxSalary;
  } else if (netSalary > 427.2) {
    taxSalary = ((netSalary - 427.2) * 10) / 90;
    taxSalary += 22.8;
    contribute = ((netSalary + taxSalary) * 5) / 95;
    grossSalary = netSalary + contribute + taxSalary;
  }

  grossSalary = round(grossSalary, 2);
  taxSalary = round(taxSalary, 2);
  contribute = round(contribute, 2);

  return { grossSalary, taxSalary, contribute };
};

const isPrimaryNetSalary = (netSalary, isPrimary) => {
  if (isPrimary) {
    return NeTsalaryCalculation(netSalary);
  } else {
    let taxSalary = 0;
    let contribute = 0;
    let grossSalary = 0;
    taxSalary = (netSalary * 10) / 90;
    contribute = ((netSalary + taxSalary) * 5) / 95;
    grossSalary = netSalary + taxSalary + contribute;
  }
};

export default NetSalaryCalculation;
