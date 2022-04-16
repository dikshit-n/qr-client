import {
  ADD_PLACE,
  EDIT_PLACE,
  PLACES,
  PLACE_DETAILS,
  USER_PROFILE,
} from "@/model";
import { axiosInstance } from "@/utils";

class PlaceApi {
  fetchProfile(): Promise<USER_PROFILE> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axiosInstance.get("/profile");
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
  fetchPlaces(): Promise<PLACES> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axiosInstance.get("/place");
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
  fetchPlace(_id: string): Promise<PLACE_DETAILS> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axiosInstance.get(`/place/${_id}`);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
  addPlace(details: ADD_PLACE): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance.post(`/place`, details);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
  editPlace(details: EDIT_PLACE): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance.patch(`/place/${details._id}`, details);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
  deletePlace(_id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance.delete(`/place/${_id}`);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}

export const placeApi = new PlaceApi();
