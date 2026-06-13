interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <main className="m-4 grid h-[calc(100vh-32px)] grid-cols-1 place-content-center rounded-3xl bg-slate-100">
      {children}
    </main>
  );
}
