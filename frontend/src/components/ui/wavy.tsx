
const getRandomPercent = () => `${Math.floor(Math.random() * 100)}%`;
const getRandomDuration = () => `${Math.random() * 3 + 2}s`; // 2-5s

const RandomSquiggles = ({ n }) => {
  const lines = Array.from({ length: n }, (_, i) => ({
    id: i,
    top: getRandomPercent(),
    left: getRandomPercent(),
    duration: getRandomDuration(),
    delay: `${Math.random() * 2}s`,
  }));

  return (
    <>
      <style>
        {`
          @keyframes wiggle {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(3deg) scale(1.05); }
            100% { transform: rotate(0deg) scale(1); }
          }
        `}
      </style>
      {lines.map((line) => (
        <svg
          key={line.id}
          style={{
            position: "absolute",
            top: line.top,
            left: line.left,
            animation: `wiggle ${line.duration} ease-in-out infinite`,
            animationDelay: line.delay,
            opacity: 0.3,
          }}
          width="400" // 4x bigger than before
          height="200"
          viewBox="0 0 400 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 180 Q 100 50, 200 180 T 400 180"
            stroke="rgba(156, 39, 176, 0.4)"
            strokeWidth="10"
            fill="none"
          />
        </svg>
      ))}
    </>
  );
};

export default RandomSquiggles;
