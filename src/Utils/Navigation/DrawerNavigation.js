import {createDrawerNavigator} from '@react-navigation/drawer';
import {NAVIGATION_ROUTES} from './NavigationRoutes';
import {LoginContainer} from '../../Container';

const Drawer = createDrawerNavigator();
function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName={NAVIGATION_ROUTES.HOME}>
      <Drawer.Screen name={NAVIGATION_ROUTES.HOME} component={LoginContainer} />
    </Drawer.Navigator>
  );
}

export default DrawerRoutes;
