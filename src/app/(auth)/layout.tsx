import { ThemeToggle } from "@/components/theme-toggle";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="bg-background text-foreground selection:bg-brand/20 selection:text-brand relative flex min-h-screen flex-col justify-center overflow-x-hidden">
      {/* Ambient Atmospheric Background for Dark Mode */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 dark:opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(173, 49, 77, 0.14), transparent 70%), radial-gradient(ellipse 90% 60% at 50% 60%, rgba(255, 255, 255, 0.025), transparent 70%), linear-gradient(180deg, #131313 0%, #111111 60%, #0e0e0e 100%)",
        }}
        aria-hidden="true"
      />

      {/* Floating Theme Toggle */}
      <div className="absolute top-5 right-6 z-20 sm:right-16">
        <ThemeToggle />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-10 sm:px-16">
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
