import appAxios from "../appAxios";

export const getCompanies = async () => {
  const { data } = await appAxios.get("/companies");
  return data;
};

export const getCompany = async (id) => {
  const { data } = await appAxios.get(`/companies/${id}`);
  return data;
};

export const createCompany = async (company) => {
  const { data } = await appAxios.post("/companies", company);
  return data;
};

export const updateCompany = async (company) => {
  const { data } = await appAxios.put(`/companies`, company);
  return data;
};

export const deleteCompany = async (id) => {
  const { data } = await appAxios.delete(`/companies/${id}`);
  return data;
};
