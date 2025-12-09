import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { UserInfoType } from "../types/user";

interface userInfoState {
  user: UserInfoType | null;
  loading: boolean;
}
interface userInfoActions {
  setUser: (user: UserInfoType | null) => void;
  setLoading: (loading: boolean) => void;
}
export const useUserInfoStore = create<userInfoState & userInfoActions>()(
  immer((set) => ({
    user: null,
    loading: true,
    setUser: (user: UserInfoType | null) =>
      set((state) => {
        state.user = user;
        state.loading = false;
      }),
    setLoading: (loading: boolean) =>
      set((state) => {
        state.loading = loading;
      }),
  }))
);
