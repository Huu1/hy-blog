import { useSelector } from 'react-redux';
import { getUser } from 'Src/store/feature/userSlice';

export default function useAuth() {
  return useSelector(getUser);
}
