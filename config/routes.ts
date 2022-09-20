export default [
  {
    path: '/map',
    name: 'map',
    icon: 'GroupOutlined',
    access: 'canAdmin',
    component: './Map/index',
  },
  
  {
    path: '/',
    redirect: '/map',
  },
  {
    component: './404',
  },
];
