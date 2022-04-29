import { authApi, userApi } from "@/api";
import { authSetup } from "@/data";
import { useSelector, useActions } from "@/hooks";
import {
  AUTH_DATA,
  INITIALIZE_ACTION,
  LOGIN_AUTH_PROPS,
  USER_PROFILE,
  USE_AUTH_OPTIONS,
} from "@/model";
import { deleteCookie, getCookie, setCookie } from "@/utils";

export function useAuth() {
  const { auth } = useSelector((state) => state);
  const { auth: authActions } = useActions();

  function initialize({ updateRedux = true }: USE_AUTH_OPTIONS = {}): Promise<
    Partial<INITIALIZE_ACTION>
  > {
    return new Promise(async (resolve, reject) => {
      const DUMMY_DATA = {
        isAuthenticated: true,
        data: {
          name: "Jaga",
          email: "jaga@mailinator.com",
          token: "test_token",
          roles: ["admin"],
        },
      };
      authActions.initialize(DUMMY_DATA);
      resolve(DUMMY_DATA);
      // try {
      //   const token = getCookie("token");
      //   if (!token) throw new Error("Session expired");
      //   const data = await authApi.initialize();
      //   let updatedData = { data, isAuthenticated: true };
      //   if (updateRedux) authActions.initialize(updatedData);
      //   resolve(updatedData);
      // } catch (err) {
      //   if (updateRedux) authActions.logout();
      //   reject(err);
      // }
    });
  }

  function login(
    loginDetails: LOGIN_AUTH_PROPS,
    { updateRedux = true }: USE_AUTH_OPTIONS = {}
  ): Promise<AUTH_DATA> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await authApi.login(loginDetails);
        setCookie(authSetup.tokenAccessor, data.token);
        if (updateRedux) authActions.login(data);
        resolve(data);
      } catch (err) {
        if (updateRedux) reject(err);
      }
    });
  }

  function fetchProfile<T = undefined>({
    updateRedux = true,
  }: USE_AUTH_OPTIONS = {}): Promise<USER_PROFILE<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await userApi.fetchProfile();
        if (updateRedux) authActions.setProfile(data);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  function logout({
    updateRedux = true,
  }: USE_AUTH_OPTIONS = {}): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await authApi.logout();
        deleteCookie(authSetup.tokenAccessor);
        if (updateRedux) authActions.logout();
        resolve();
      } catch (err) {
        if (updateRedux) authActions.logout();
        reject(err);
      }
    });
  }

  const authUsableData = { ...auth, login, logout, initialize, fetchProfile };

  return authUsableData;
}
