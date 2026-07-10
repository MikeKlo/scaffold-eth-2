import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { ScaffoldEthAppWithProviders } from '../components/ScaffoldEthAppWithProviders';
import { ThemeProvider } from 'next-themes';
import { getMetadata } from '../utils/scaffold-eth/getMetadata';

export const metadata = getMetadata({
  title: 'NFT Bazaar',
  description: 'Decentralized NFT Marketplace',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
          <ScaffoldEthAppWithProviders>
            {children}
          </ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}