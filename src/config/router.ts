import Loadable from 'react-loadable';
import Loading from 'Src/components/Loading';

const Home = Loadable({
  loader: () => import(/* webpackChunkName:'Dashboard' */ 'Src/views/Home'),
  loading: Loading,
});
const Author = Loadable({
  loader: () => import(/* webpackChunkName:'Dashboard' */ 'Src/views/Author'),
  loading: Loading,
});
const Test = Loadable({
  loader: () => import(/* webpackChunkName:'Dashboard' */ 'Src/views/Test'),
  loading: Loading,
});
const Error = Loadable({
  loader: () => import(/* webpackChunkName:'Dashboard' */ 'Src/components/404'),
  loading: Loading,
});
const Article = Loadable({
  loader: () => import(/* webpackChunkName:'Dashboard' */ 'Src/views/Article'),
  loading: Loading,
});

export default [
  { path: '/home', component: Home },
  { path: '/article/:id', component: Article },
  { path: '/author', component: Author },
  { path: '/test', component: Test },
  { path: '/error/404', component: Error },
];
