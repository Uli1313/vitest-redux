import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchUser,
  selectUserName,
  selectUserFetchStatus,
} from "../../store/userSlice";

export default function UserDisplay() {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(selectUserName);
  const userFetchStatus = useAppSelector(selectUserFetchStatus);

  return (
    <div>
      <div>{userName}</div>
      <button onClick={() => dispatch(fetchUser())}>Fetch user</button>
      {userFetchStatus === "loading" && <div>Fetching user...</div>}
    </div>
  );
}
