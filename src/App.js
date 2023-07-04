import React, { useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const canvasRef = useRef(null);
  const paddleHeight = 100;
  const paddleWidth = 10;
  const canvasHeight = 600;
  const canvasWidth = 800;

  let paddle1Y = canvasHeight / 2 - paddleHeight / 2;
  let paddle2Y = canvasHeight / 2 - paddleHeight / 2;
  let ballX = canvasWidth / 2;
  let ballY = canvasHeight / 2;
  let ballSpeedX = -2;
  let ballSpeedY = 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawCanvas = () => {
      context.fillStyle = '#000';
      context.fillRect(0, 0, canvasWidth, canvasHeight);
    };

    const drawPaddle = (x, y) => {
      context.fillStyle = '#fff';
      context.fillRect(x, y, paddleWidth, paddleHeight);
    };

    const drawBall = () => {
      context.fillStyle = '#fff';
      context.beginPath();
      context.arc(ballX, ballY, 10, 0, Math.PI * 2, false);
      context.closePath();
      context.fill();
    };

    const movePaddle = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseY = e.clientY - rect.top - paddleHeight / 2;

      if (mouseY > 0 && mouseY < canvasHeight - paddleHeight) {
        paddle1Y = mouseY;
      }
    };

    const animate = () => {
      drawCanvas();
      drawPaddle(0, paddle1Y);
      drawPaddle(canvasWidth - paddleWidth, paddle2Y);
      drawBall();

      ballX += ballSpeedX;
      ballY += ballSpeedY;

      if (ballY < 0 || ballY > canvasHeight) {
        ballSpeedY *= -1;
      }

      if (ballX < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
          ballSpeedX *= -1;
        } else {
          resetBall();
        }
      }

      if (ballX > canvasWidth - paddleWidth) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
          ballSpeedX *= -1;
        } else {
          resetBall();
        }
      }

      requestAnimationFrame(animate);
    };

    const resetBall = () => {
      ballX = canvasWidth / 2;
      ballY = canvasHeight / 2;
      ballSpeedX = -2;
      ballSpeedY = 2;
    };

    canvas.addEventListener('mousemove', movePaddle);

    animate();

    return () => {
      canvas.removeEventListener('mousemove', movePaddle);
    };
  }, []);

  return (
    <div className="App">
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
    </div>
  );
};

export default App;
