import { useState } from "react";

import { Container, RaffleButton } from "./styles";

const Roulette = () => {
  const [myList, setMyList] = useState(names);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [startIndex] = useState<number>(0);

  const animateRoulette = () => {
    if (isAnimating) {
      return;
    }

    const animationDuration = 1000;

    let startTime: any;

    setIsAnimating(true);

    const shuffledList = myList.slice().sort(() => Math.random() - 0.5);

    const animate = (timestamp: any) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;

      if (elapsed < animationDuration) {
        const progress = elapsed / animationDuration;
        const position = Math.floor(progress * shuffledList.length);

        const newList = [...shuffledList];

        for (let i = 0; i < position; i++) {
          const temp: string | undefined = newList.pop();
          if (temp) {
            newList.unshift(temp);
          }
        }

        setMyList(newList);

        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  };

  const displayedNames = myList.slice(startIndex, startIndex + 5);

  return (
    <Container>
      <div>
        <img 
          alt="logo" 
          src="https://cdn.alboompro.com/630e19fcf935a50001279613_65284c94331d870001dbf5ee/original_size/jau_summit_branco-brilho-1.png?v=1"
          style={{ marginBottom: '140px' }}
        />
      </div>

      <div>
        {displayedNames.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>

      <RaffleButton onClick={animateRoulette} disabled={isAnimating}>
        sortear
      </RaffleButton>
    </Container>
  );
};

const names = [
  "String 1",
  "String 2",
  "String 3",
  "String 4",
  "String 5",
  "String 6",
  "String 7",
  "String 8",
  "String 9",
  "String 10",
  "String 11",
  "String 12",
  "String 13",
  "String 14",
  "String 15",
  "String 16",
  "String 17",
  "String 18",
  "String 19",
  "String 20",
  "String 21",
  "String 22",
  "String 23",
  "String 24",
  "String 25",
  "String 26",
  "String 27",
  "String 28",
  "String 29",
  "String 30",
];

export default Roulette;
