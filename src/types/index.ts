// Пользователь. Позиция в рейтинговой таблице определяется позицией в
// массиве пользователей
export interface Racer {
  id: number;
  // Любимый цвет
  color: string;
  // Полное имя
  first_name: string;
  last_name: string;
  // Скорость выполнения заезда
  speed: number;
  // Время заезда. Выражено в миллисекундах
  time: string;
}
