import { combineReducers } from 'redux';
import AuthReducer from './auth/auth.reducer';
import UserReducer from './user/user.reducer';
import ProjectsReducer from './projects/projects.reducer';
import PagesReducer from './pages/pages.reducer';

export default combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  projects: ProjectsReducer,
  pages: PagesReducer,
});
