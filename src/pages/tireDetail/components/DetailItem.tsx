interface DetailItemProps {
  label: string;
  value: string | number;
}
export function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div>
      <p className='text-sm text-gray-500'>{label}</p>
      <p className='text-md font-medium text-dark_blue'>{value}</p>
    </div>
  );
}
