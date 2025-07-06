import { Redirect } from "expo-router";
import './global.css';

const Home = () => {
    return <Redirect href="/auth/sign-up" />;
};

export default Home;