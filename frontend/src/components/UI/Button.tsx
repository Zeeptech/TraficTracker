export function Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      className="bg-emerald-800 px-4 py-1 cursor-pointer text-white rounded-md hover:bg-emerald-900 ease-in-out duration-200"
      onClick={onClick}
    >
      {children}
    </button>
  );
}