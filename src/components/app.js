/* eslint-disable import/no-cycle */
import axios from 'axios';
import api from '../helpers_api/api';
import { leaderboardData } from '../helpers_api/data';
import { switchComponents } from './control';

export const saveUser = (e) => {
  e.preventDefault();
  localStorage.setItem('endless_flying_current_user', new FormData(e.target).get('username'));
  if (leaderboardData.get() != null) { switchComponents('options'); }
  return true;
};

export const getCurrentUser = () => localStorage.getItem('endless_flying_current_user');

export const loadLeaderboard = async () => {
  const { data: { result } } = await axios.get(api);
  return result.sort((a, b) => b.score - a.score);
};

export const saveScore = async (obj) => {
  const { data } = await axios.post(api, obj);
  return data;
};