/* eslint-disable no-shadow */
export enum ActionType {
  CHANGE_CURRENT = 'CHANGE_CURRENT',
  CHANGE_TAG = 'CHANGE_TAG',
  CHANGE_ALL = 'CHANGE_ALL',
}
export function paramReducer(state: any, action: any) {
  const { type, payload } = action;
  switch (type) {
    case 'CHANGE_CURRENT':
      return { ...state, current: state.current + 1 };
    case 'CHANGE_TAG':
      return { ...state, tagId: payload };
    case 'CHANGE_ALL':
      return { ...payload };
    default:
      throw new Error('type error');
  }
}
