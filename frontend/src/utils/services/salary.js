import appAxios from "../appAxios";

export const getSalaries = async () => {
  const { data } = await appAxios.get("/salaries");
  return data;
};

export const getSalariesByCompanyId = async (companyId) => {
  const { data } = await appAxios.get(`/salaries/companies/${companyId}`);
  return data;
};

export const getSalariesByDate = async (date) => {
  const { data } = await appAxios.get("/salaries", {
    params: { ...date },
  });
  return data;
};

export const getSalaryByHeadId = async (headId) => {
  const { data } = await appAxios.get(`/salaries/${headId}`);
  return data;
};
