export function ToggleIcon({ isActive }: { isActive: boolean }) {
  if (isActive)
    return (
      <svg
        width='25'
        height='25'
        viewBox='0 0 25 25'
        fill='none'
        stroke='#008080'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M9 11.5L12 14.5L22 4.5'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M21 12.5V19.5C21 20.0304 20.7893 20.5391 20.4142 20.9142C20.0391 21.2893 19.5304 21.5 19 21.5H5C4.46957 21.5 3.96086 21.2893 3.58579 20.9142C3.21071 20.5391 3 20.0304 3 19.5V5.5C3 4.96957 3.21071 4.46086 3.58579 4.08579C3.96086 3.71071 4.46957 3.5 5 3.5H16'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    );
  return (
    <svg
      width='25'
      height='25'
      viewBox='0 0 25 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='3'
        y='3.4'
        width='18'
        height='18'
        rx='2'
        stroke='currentColor'
        strokeWidth='2'
      />
    </svg>
  );
}
