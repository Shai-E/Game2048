export const createNavigationScreen = (navigationItems, OutputComponent) => {
  return Object.entries(navigationItems).map(([name, Component]) => {
    const ComponentWithProps = props => {
      return <Component {...props} tab={name} />;
    };
    return (
      <OutputComponent
        key={name + 'Screen'}
        name={name}
        component={ComponentWithProps}
      />
    );
  });
};
