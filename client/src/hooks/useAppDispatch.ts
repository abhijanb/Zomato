import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";

export const useAppDispatch = () => {
  const dispatch = useDispatch<AppDispatch>();
  return dispatch;
}