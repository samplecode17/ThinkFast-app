import { createStore } from "vuex";
import users from './modules/users';
import games from './modules/games';
import challenges from "./modules/challenges";
import quiz from "./modules/quiz";
import usergames from "./modules/usergames";
import imagepost from "./modules/imagepost";
import categories from "./modules/categories";
import navbar from "./modules/navbar";
import difficulties from "./modules/difficulties";

export default createStore({
    modules: {
      users,
      games,
      challenges,
      quiz,
      usergames,
      imagepost,
      navbar,
      categories,
      difficulties,
    }
});