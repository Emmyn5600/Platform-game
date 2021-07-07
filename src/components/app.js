/* eslint-disable import/no-cycle */
import axios from 'axios';
import api from '../helpers_api/api.js';
import { leaderboardData } from '../helpers_api/element.js';
import { switchComponents } from './control.js';

export const saveUser = (e) => {
  e.preventDefault();
  localStorage.setItem('endless_running_current_user', new FormData(e.target).get('username'));
  if (leaderboardData.get() != null) { switchComponents('options'); }
  return true;
};

export const getCurrentUser = () => localStorage.getItem('endless_running_current_user');

export const loadLeaderboard = async () => {
  const { data: { result } } = await axios.get(api);
  return result.sort((a, b) => b.score - a.score);
};

export const saveScore = async (obj) => {
  const { data } = await axios.post(api, obj);
  return data;
};