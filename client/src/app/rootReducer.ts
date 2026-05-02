import authApi from "../api/authApi";
import authSlice from "../features/restaurant/authSlice";

const rootReducer = {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
};

export default rootReducer;