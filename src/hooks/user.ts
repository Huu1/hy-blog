import { useSelector } from 'react-redux';
import { getUser } from 'Src/store/feature/userSlice';

export function useAuth() {
  return useSelector(getUser);
}
