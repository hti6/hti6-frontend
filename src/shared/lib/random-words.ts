interface GenerateOptions {
  min?: number;
  max?: number;
  exactly?: number;
  join?: string | false;
  maxLength?: number;
  wordsArray?: string[];
  capitalize?: boolean | "first" | "all";
  allowRepeat?: boolean;
}

const russianWords: string[] = [
  "кот",
  "собака",
  "дом",
  "дерево",
  "книга",
  "стол",
  "стул",
  "окно",
  "дверь",
  "ручка",
  "карандаш",
  "бумага",
  "компьютер",
  "телефон",
  "машина",
  "велосипед",
  "город",
  "страна",
  "река",
  "море",
  "гора",
  "лес",
  "поле",
  "небо",
  "солнце",
  "луна",
  "звезда",
  "цветок",
  "трава",
  "птица",
  "рыба",
  "человек",
  "ребенок",
  "семья",
  "друг",
  "работа",
  "школа",
  "университет",
  "музыка",
  "фильм",
  "театр",
  "спорт",
  "еда",
  "вода",
  "чай",
  "кофе",
];

function capitalizeWord(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function generateRandomRussianWords(
  options: GenerateOptions = {},
): string | string[] {
  const {
    min = 1,
    max = 3,
    exactly,
    join = " ",
    maxLength,
    wordsArray = russianWords,
    capitalize = false,
    allowRepeat = false,
  } = options;

  const count: number =
    exactly !== undefined
      ? exactly
      : Math.floor(Math.random() * (max - min + 1)) + min;
  const result: string[] = [];
  const availableWords: string[] = [...wordsArray];

  while (result.length < count && availableWords.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    let word: string = availableWords[randomIndex];

    if (maxLength !== undefined && word.length > maxLength) {
      if (!allowRepeat) {
        availableWords.splice(randomIndex, 1);
      }
      continue;
    }

    if (capitalize === true || capitalize === "all") {
      word = capitalizeWord(word);
    } else if (capitalize === "first" && result.length === 0) {
      word = capitalizeWord(word);
    }

    result.push(word);

    if (!allowRepeat) {
      availableWords.splice(randomIndex, 1);
    }
  }

  if (join === false) {
    return result;
  } else {
    const joinedResult = result.join(join);
    return capitalize === "first" ? capitalizeWord(joinedResult) : joinedResult;
  }
}
