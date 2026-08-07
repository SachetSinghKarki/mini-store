type ProductsLayoutProps = {
  children: React.ReactNode;
};

export default function ProductsLayout({
  children,
}: ProductsLayoutProps) {
  return (
    <main className="container mx-auto max-w-7xl py-10">
      <div className="space-y-8">
        {children}
      </div>
    </main>
  );
}