import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001',
});



export const createRoom = async (userId) => {
  try {
    const response = await api.post('/room/', { userId });
    return response.data;
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
};
export const getRoomById = async (roomId) => {
  try {
    const response = await api.get(`/room/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching room:', error);
    throw error;
  }
};


export const joinRoom = async (roomId, opponentId) => {
  try {
    const response = await api.post(`/room/join/${roomId}`, { opponentId });
    return response.data;
  } catch (error) {
    console.error('Error joining room:', error);
    throw error;
  }
};