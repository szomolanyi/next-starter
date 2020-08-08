export const getMenuData = (currentUser, logout, verifyEmail) => {
  const data = [
    {
      className: 'menu-list has-text-info',
      itemProps: { faIconName: 'fab fa-twitter', title: 'TWITTER DEMO' },
      href: '/twitter/',
      aProps: {},
    },
    {
      className: 'menu-list',
      itemProps: { faIconName: 'fas fa-home', title: 'Home' },
      href: '/twitter/',
      aProps: {},
    },
    {
      className: 'menu-list',
      itemProps: { faIconName: 'fas fa-search', title: 'Explore' },
      href: '/twitter/explore',
      aProps: {},
    },
  ];
  if (currentUser) {
    if (!currentUser.isVerified) {
      data.push({
        className: 'menu-list',
        itemProps: { faIconName: 'fas fa-search', title: 'Verify' },
        href: '',
        aProps: { onClick: verifyEmail },
      });
    }
    data.push(
      {
        className: 'menu-list',
        itemProps: { faIconName: 'fas fa-user', title: 'Profile' },
        href: '/twitter/profile',
        aProps: {},
      },
      {
        className: 'menu-list',
        itemProps: { faIconName: 'fas fa-search', title: 'Logout' },
        href: '',
        aProps: { onClick: logout },
      },
    );
  } else {
    data.push(
      {
        className: 'menu-list',
        itemProps: { faIconName: 'fas fa-sign-in-alt', title: 'Login' },
        href: '/twitter/login',
        aProps: {},
      },
      {
        className: 'menu-list',
        itemProps: { faIconName: 'fas fa-user-plus', title: 'Sign up' },
        href: '/twitter/signup',
        aProps: {},
      },
    );
  }
  data.push({
    className: 'menu-list',
    itemProps: { faIconName: 'fas fa-window-close', title: 'Exit twitter' },
    href: '/',
    aProps: {},
  });
  return data;
};

export const eslintDummmy = 0;
