import { createStore } from "vuex";
import users from './modules/users';
import games from './modules/games';
import challenges from "./modules/challenges";
import quiz from "./modules/quiz";
import usergames from "./modules/usergames";

export default createStore({
    modules: {
      users,
      games,
      challenges,
      quiz,
      usergames,
    }
});