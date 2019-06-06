import { createStackNavigator, createAppContainer} from "react-navigation";
import Home from './screens/home'

const MainNavigator = createStackNavigator({
	Home: {
		screen: Home
	},
});


export default createAppContainer(MainNavigator);
