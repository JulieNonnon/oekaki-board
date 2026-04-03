// Layout global, obligatoire avec Next.js. 
// Il doit toujours exister, exporter un composant React par défault et retourner du jsx. 
// Il englobe toutes les pages de l'application, on peut y mettre des éléments communs (header, footer, etc.) et des styles globaux.
// layout → page → components

//import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}