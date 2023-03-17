interface PageProps {
  seconds: number;
}

export default function Timer({ seconds }: PageProps) {
  return (
    <p className="timer">
      timer:
      {seconds.toLocaleString(undefined, {
        minimumIntegerDigits: 2,
      })}
    </p>
  );
}
