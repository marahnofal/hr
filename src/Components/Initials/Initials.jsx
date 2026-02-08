
export default function Initials({ name = '' }) {
  let initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="bg-green flex h-8 w-8 items-center justify-center rounded-full md:h-12 md:w-12">
      <p className="font-bold text-white text-shadow-md md:text-lg">
        {initials}
      </p>
    </div>
  );
}
