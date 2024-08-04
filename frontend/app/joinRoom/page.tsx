"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createRoom, joinRoom } from '../api/room'; 

export default function JoinRoom() {
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      const mouseXpercentage = Math.round(event.pageX / windowWidth * 100);
      const mouseYpercentage = Math.round(event.pageY / windowHeight * 100);
      
      setMousePosition({ x: mouseXpercentage, y: mouseYpercentage });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleCreateRoom = async () => {
    try {
      const userId = 'someUserId'; 
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
      const opponentId = 'someOpponentId'; 
      await joinRoom(roomId, opponentId);
      window.location.href = `/room/${roomId}`;
    } catch (error) {
      setError('Failed to join room');
      console.error('Error joining room:', error);
    }
  };

  return (
    <div className="radial-gradient">
      <div className="container">
        <h1 className="start-text">Start!</h1>
        <div className="button-container">
          <button className="button-27" onClick={handleCreateRoom}>Create Room</button>
          <div className="join-container">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter Room ID"
            />
            <button className="button-27" onClick={handleJoinRoom}>Join Room</button>
          </div>
        </div>
        {error && <p className="error">{error}</p>}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          font-family: Arial, sans-serif;
          width: 100%;
          max-width: 400px;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .start-text {
          font-family: 'Roboto', sans-serif;
          font-weight: 700;
          font-size: 3rem;
          color: #333;
          margin-bottom: 1.5rem;
        }
        .button-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }
        .join-container {
          display: flex;
          gap: 0.5rem;
        }
        input {
          padding: 0.75rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          flex-grow: 1;
        }
        .error {
          color: #D32F2F;
          margin-top: 1rem;
          text-align: center;
          font-weight: bold;
        }
        .button-27 {
          appearance: none;
          background-color: #040725;
          border: 2px solid #1A1A1A;
          border-radius: 15px;
          box-sizing: border-box;
          color: #FFFFFF;
          cursor: pointer;
          display: inline-block;
          font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
          font-size: 16px;
          font-weight: 600;
          line-height: normal;
          margin: 0;
          min-height: 60px;
          min-width: 0;
          outline: none;
          padding: 16px 24px;
          text-align: center;
          text-decoration: none;
          transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
          width: 100%;
          will-change: transform;
        }
        .button-27:disabled {
          pointer-events: none;
        }
        .button-27:hover {
          box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
          transform: translateY(-2px);
        }
        .button-27:active {
          box-shadow: none;
          transform: translateY(0);
        }
        .radial-gradient {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          position: fixed;
          top: 0px;
          left: 0px;
          height: 100%;
          width: 100%;
          background: radial-gradient(at ${mousePosition.x}% ${mousePosition.y}%, #75b9e7, #FFFFFF);
          transition: background 0.3s ease;
        }
      `}</style>
    </div>
  );
}