
const getRandomPercent = () => `${Math.floor(Math.random() * 100)}%`;
const getRandomSize = () => {
  const sizes = ["w-16 h-16", "w-20 h-20", "w-24 h-24", "w-28 h-28", "w-32 h-32"];
  return sizes[Math.floor(Math.random() * sizes.length)];
};
const getRandomDuration = () => `${Math.random() * 5 + 5}s`; // 3-8s
const getRandomDelay = () => `${Math.random() * 2}s`; // Random start delay

const RandomBlurCircle = ({ n }) => {
  const circles = Array.from({ length: n }, (_, index) => ({
    id: index,
    top: getRandomPercent(),
    left: getRandomPercent(),
    size: getRandomSize(),
    duration: getRandomDuration(),
    delay: getRandomDelay(),
  }));

  return (
    <>
      <style>
        {`
          @keyframes floatAround {
            0% { transform: translate(0, 0); }
            25% { transform: translate(50px, -50px); }
            50% { transform: translate(-50px, 50px); }
            75% { transform: translate(50px, 25px); }
            100% { transform: translate(0, 0); }
          }
        `}
      </style>
      {circles.map((circle) => (
        <div
          key={circle.id}
          style={{
            top: circle.top,
            left: circle.left,
            animation: `floatAround ${circle.duration} ease-in-out infinite`,
            animationDelay: circle.delay,
          }}
          className={`absolute ${circle.size} bg-purple-500 rounded-full opacity-20 blur-xl hidden md:block`}
        ></div>
      ))}
    </>
  );
};

export default RandomBlurCircle;
