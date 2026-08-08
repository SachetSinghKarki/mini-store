type ProductsLayoutProps = {
  children: React.ReactNode;
};

export default function ProductsLayout({
  children,
}: ProductsLayoutProps) {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  );
}