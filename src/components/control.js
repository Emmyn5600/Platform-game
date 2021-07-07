/* eslint-disable import/no-cycle */
import { getCurrentUser, loadLeaderboard, saveScore } from './app';
import Element, {
  usernameDiv,
  optionBtns,
  leaderboard,
  welcomeContent,
  gameContainer,
  leaderboardData,
  saveLoading,
  gameBtnsC,
} from '../helpers_api/element';

const lbItem = ({ user, score }) => {
  const tr = new Element().create('tr');

  const nameTd = new Element().create('td');
  nameTd.get().appendChild(document.createTextNode(user));
  const scoreTd = new Element().create('td');
  scoreTd.get().appendChild(document.createTextNode(score));

  tr.get().appendChild(nameTd.get());
  tr.get().appendChild(scoreTd.get());

  return tr.get();
};

export const switchComponents = (value) => {
  switch (value) {
    case 'options': {
      optionBtns.show('flex');
      usernameDiv.hide();
      leaderboard.hide();
      break;
    }
    case 'username-c': {
      usernameDiv.show('flex');
      optionBtns.hide();
      leaderboard.hide();
      break;
    }
    case 'leaderboard': {
      leaderboard.show('block');
      optionBtns.hide();
      usernameDiv.hide();
      loadLeaderboard().then((result) => {
        leaderboardData.get().innerHTML = '';
        result.forEach((item) => {
          leaderboardData.get().appendChild(lbItem(item));
        });
      });
      break;
    }
    default:
      break;
  }
};

export const switchSections = (value) => {
  switch (value) {
    case 'welcome-s': {
      welcomeContent.show('block');
      gameContainer.hide();
      break;
    }
    case 'game-s': {
      welcomeContent.hide();
      gameContainer.show('block');
      break;
    }
    default:
      break;
  }
};

export const Start = () => {
  if (!getCurrentUser()) {
    switchComponents('username-c');
  } else {
    switchComponents('options');
  }
};

export const saveScoreInfo = (score) => {
  gameBtnsC.hide();
  saveLoading.show('block');
  saveScore({ user: getCurrentUser(), score }).then(() => {
    gameBtnsC.show('flex');
    saveLoading.hide();
  });
};
