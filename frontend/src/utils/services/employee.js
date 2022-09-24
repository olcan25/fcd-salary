import appAxios from "../appAxios";

export const getEmployees = async () => {
    const { data } = await appAxios.get("/employees");
    return data;
    }

export const getEmployee = async (id) => {
    const { data } = await appAxios.get(`/employees/${id}`);
    return data;
    }

export const createEmployee = async (employee) => {
    const { data } = await appAxios.post("/employees", employee);
    return data;
    }

export const updateEmployee = async (employee) => {
    const { data } = await appAxios.put(`/employees`, employee);
    return data;
    }

export const deleteEmployee = async (id) => {
    const { data } = await appAxios.delete(`/employees/${id}`);
    return data;
    }
    