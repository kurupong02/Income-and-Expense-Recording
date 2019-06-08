import { createStackNavigator, createAppContainer} from "react-navigation";
import Home from './src/screens/home'

const MainNavigator = createStackNavigator({
	Home: {
		screen: Home
	},
});


export default createAppContainer(MainNavigator);
