import { useState } from "react";

import { Container, RaffleButton, NameItem, ListContainer } from "./styles";

const Roulette = () => {
  const [myList, setMyList] = useState([
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
  ]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [startIndex] = useState<number>(0);
  // const [displayedNewList, setDisplayedNewList] = useState<string[]>([]);

  const animateRoulette = () => {
    if (isAnimating) {
      return;
    }

    const animationDuration = 3000;
    // const anamationTimeout = Math.floor(animationDuration / 3);

    let startTime: any;

    setIsAnimating(true);

    const shuffledList = myList.slice().sort(() => Math.random() - 0.5);

    const animate = (timestamp: any) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const remainingTime = animationDuration - elapsed;
      const decelerationFactor = remainingTime / animationDuration;

      if (elapsed < animationDuration) {
        const progress = elapsed / animationDuration;
        const position = Math.floor(progress * shuffledList.length);

        const newList = [...shuffledList];

        for (let i = 0; i < position; i++) {
          console.log(newList)
          const temp: string | undefined = newList.pop();
          if (temp) {
            newList.unshift(temp);
          }
        }

        setMyList(newList);

        // Ajuste do progresso com base na desaceleração
        const adjustedProgress = progress * (1 + decelerationFactor);

        if (adjustedProgress <= 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  };

  const displayedList = myList.slice(startIndex, startIndex + 5);

  return (
    <Container>
      <div>
        <img
          alt="logo"
          src="https://cdn.alboompro.com/630e19fcf935a50001279613_65284c94331d870001dbf5ee/original_size/jau_summit_branco-brilho-1.png?v=1"
          style={{ marginBottom: '76px' }}
        />
      </div>

      <ListContainer>
        {displayedList.map((item, index) => {
          return <NameItem key={index} identification={index}>{item}</NameItem>
        }
        )}
      </ListContainer>

      <RaffleButton onClick={animateRoulette} disabled={isAnimating}>
        sortear
      </RaffleButton>
    </Container>
  );
};

export default Roulette;
