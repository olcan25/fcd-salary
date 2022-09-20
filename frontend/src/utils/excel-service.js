import * as excelJS from "exceljs";
import { saveAs } from "file-saver";

const excelData = (data) => {
  let fileName = `Atk Template.xlsx`;
  const workbook = new excelJS.Workbook();
  workbook.creator = "FCD";
  workbook.created = new Date();
  workbook.company = "Financial Consultant-D";
  workbook.title = "Atk Template";
  workbook.keywords = "Atk Template";
  workbook.subject = "Atk Template";
  const worksheet = workbook.addWorksheet("Atk Template");

  worksheet.columns = [
    { header: "Emri", key: "firstName", width: 10 },
    { header: "Mbiemri", key: "lastName", width: 32 },
    { header: "Numri Individual i punëtorit", key: "id", width: 10 },
    { header: "Bruto paga për muaj", key: "grossSalary", width: 10 },
    {
      header: "Kontributi pensional i të punësuarit",
      key: "employeeContribute",
      width: 10,
    },
    {
      header: "Kontributi pensional i punëdhënësit",
      key: "employerContribute",
      width: 10,
    },
    {
      header: "Kontributi suplementar i të punësuarit",
      key: "supEmployee",
      width: 10,
    },
    {
      header: "Kontributi suplementar i punëdhënësit",
      key: "supEmployer",
      width: 10,
    },
    { header: "Punë Primare", key: "isPrimary", width: 10 },
    { header: "Përfshihen Kontributet", key: "isContribute", width: 10 },
    { header: "Aplikohet Tatimi në Paga", key: "isApply", width: 10 },
  ];

  worksheet.addRow({
    firstName: "a",
    lastName: "b",
    id: "c",
    grossSalary: "d",
    employeeContribute: "e=(d*5%)",
    employerContribute: "f=(d*5%)",
    supEmployee: "g",
    supEmployer: "h",
    isPrimary: "i",
    isContribute: "j",
    isApply: "k",
  });

  data.forEach((element) => {
    worksheet.addRow({
      firstName: element.firstName,
      lastName: element.lastName,
      id: element.id,
      grossSalary: element.grossSalary,
      employeeContribute: element.employeeContribute,
      employerContribute: element.employerContribute,
      supEmployee: 0,
      supEmployer: 0,
      isPrimary: "PO",
      isContribute: "PO",
      isApply: "PO",
    });
  });

  //workbook.xlsx.writeFile(fileName);
  workbook.xlsx
    .writeBuffer()
    .then((buffer) =>
      saveAs(new Blob([buffer]), `Atk Template ${Date.now()}.xlsx`)
    )
    .catch((err) => console.log("Error writing excel export", err));
};

export default excelData;
