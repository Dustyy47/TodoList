export function EditIcon({ isActive }: { isActive: boolean }) {
  if (isActive)
    return (
      <svg
        width='24'
        height='25'
        viewBox='0 0 24 25'
        fill='none'
        stroke='currentColor'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M20 6.5L9 17.5L4 12.5'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    );
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M16.1038 4.66848C16.3158 4.45654 16.5674 4.28843 16.8443 4.17373C17.1212 4.05903 17.418 4 17.7177 4C18.0174 4 18.3142 4.05903 18.5911 4.17373C18.868 4.28843 19.1196 4.45654 19.3315 4.66848C19.5435 4.88041 19.7116 5.13201 19.8263 5.40891C19.941 5.68582 20 5.9826 20 6.28232C20 6.58204 19.941 6.87882 19.8263 7.15573C19.7116 7.43263 19.5435 7.68423 19.3315 7.89617L8.43807 18.7896L4 20L5.21038 15.5619L16.1038 4.66848Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
