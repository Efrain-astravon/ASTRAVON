import React from "react";

type DateFormatterProps = {
  date?: Date | null;
};

export const DateFormatter: React.FC<DateFormatterProps> = ({ date }) => {
  if (!date) return <em>—</em>;

  const d = new Date(date);
  const pad = (num: number) => String(num).padStart(2, "0");
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1); // Mes empieza desde 0
  const year = String(d.getFullYear()).slice(-2); // últimos 2 dígitos año

  return (
    <span>
      {hours}:{minutes}:{seconds} - {day}-{month}-{year}
    </span>
  );
};
