"use client";
import { useState } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createRoom, joinRoom } from '../api/room'; // Adjust the import path as needed

export default function JoinRoom() {
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');

  const handleCreateRoom = async () => {
    try {
      const userId = 'someUserId'; // Replace this with actual user ID
      const response = await createRoom(userId);
      window.location.href = `/room/${response.id}`;
    } catch (error) {
      setError('Failed to create room');
      console.error('Error creating room:', error);
    }
  };
  
  const handleJoinRoom = async () => {
    if (!roomId) {
      setError('Please enter a room ID');
      return;
    }
    try {
      const opponentId = 'someOpponentId'; // Replace this with actual opponent ID
      await joinRoom(roomId, opponentId);
      window.location.href = `/room/${roomId}`;
    } catch (error) {
      setError('Failed to join room');
      console.error('Error joining room:', error);
    }
  };
  return (
    <div className="container">
      <h1>Join or Create a Room</h1>
      <div className="button-container">
        <button onClick={handleCreateRoom}>Create Room</button>
        <div>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter Room ID"
          />
          <button onClick={handleJoinRoom}>Join Room</button>
        </div>
      </div>
      {error && <p className="error">{error}</p>}

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }
        .button-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 20px;
        }
        button {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
        }
        input {
          padding: 10px;
          font-size: 16px;
          margin-right: 10px;
        }
        .error {
          color: red;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}