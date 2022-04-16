import {
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  EMPLOYEES,
  EMPLOYEE_DETAILS,
  USER_PROFILE,
} from "@/model";
import { axiosInstance } from "@/utils";

class UserApi {
  fetchProfile(): Promise<USER_PROFILE> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axiosInstance.get("/user/profile");
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
  fetchEmployees(): Promise<EMPLOYEES> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axiosInstance.get("/user/employee");
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
  fetchEmployee(_id: string): Promise<EMPLOYEE_DETAILS> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axiosInstance.get(`/user/${_id}`);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
  addEmployee(details: ADD_EMPLOYEE): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance.post(`/user`, details);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
  editEmployee(details: EDIT_EMPLOYEE): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance.patch(`/user/${details._id}`, details);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
  deleteEmployee(_id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance.delete(`/user/${_id}`);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}

export const userApi = new UserApi();
