export const createNavigationScreen = (
  navigationItems,
  OutputComponent,
  topTabBarShown,
) => {
  return Object.entries(navigationItems).map(([name, Component]) => {
    const Stack = props => {
      return (
        <Component {...props} topTabBarShown={topTabBarShown} tab={name} />
      );
    };
    return (
      <OutputComponent key={name + 'Screen'} name={name} component={Stack} />
    );
  });
};
