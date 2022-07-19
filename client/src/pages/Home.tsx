import CreateRoom from "../components/CreateRoom";
import JoinRoom from "../components/JoinRoom";

const Home = () => {
    return (
        <div className="w-full h-full px-4 pt-12 bg-blue-50">
            <div className="max-w-xl mx-auto rounded-lg shadow-lg" >
                <CreateRoom/>
                <JoinRoom/>
            </div>
        </div>
    );
}

export default Home;