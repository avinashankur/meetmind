interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <main className="m-4 h-[calc(100vh-32px)] rounded-3xl shadow-sm grid grid-cols-1 place-content-center">
      {children}
    </main>
  );
}
