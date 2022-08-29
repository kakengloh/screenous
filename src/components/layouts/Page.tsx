import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import { ReactNode } from 'react';

interface PageProps {
  children: ReactNode;
  meta?: {
    title: string;
    description?: string;
    canonical?: string;
  };
}

const Page = ({ children, meta }: PageProps) => {
  if (!meta) {
    meta = {
      title: 'Screenous - Record your screen, share it in seconds',
      description:
        'Screenous is a FREE online screen recording and sharing app. Record your screen and share it through a generated quick link. No sign-up or installation is required.',
    };
  }

  return (
    <Box>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content={meta.description} />
        {meta.canonical && <link rel="canonical" href={meta.canonical} />}
        {meta.canonical && <meta property="og:url" content={meta.canonical} />}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content="/logo512.png" />
        <meta property="og:site_name" content="Screenous" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {children}
    </Box>
  );
};

export default Page;
