// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../redux/store";
// import { login as loginAction, logout as logoutAction } from "../redux/slices/authSlice";
// import { AuthUser } from "../types/user";

// export const useAuth = () => {
//   const user = useSelector((state: RootState) => state.auth.user);
//   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
//   const dispatch = useDispatch();

//   return {
//     user,
//     isAuthenticated,
//     login: (user: AuthUser) => dispatch(loginAction(user)),
//     logout: () => dispatch(logoutAction()),
//   };
// };
import { useAuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
  return useAuthContext();
};
