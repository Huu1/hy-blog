import { useSelector } from 'react-redux';
import { getUser } from 'Src/store/feature/appSlice';

export default function useAuth() {
  return useSelector(getUser);
}
