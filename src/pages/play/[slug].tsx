import { Center } from '@chakra-ui/react';
import type { GetServerSideProps, NextPage } from 'next';
import { Page, Header, Content } from 'components/layouts';
import s3 from 'services/s3';

interface PlayProps {
  url: string;
}

const Play: NextPage<PlayProps> = ({ url }) => {
  return (
    <Page>
      <Header />
      <Content>
        <Center h="100vh" w="full">
          <video
            src={url}
            autoPlay
            controls
            width="800"
            height="400"
            style={{ borderRadius: 15, objectFit: 'cover' }}
          />
        </Center>
      </Content>
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;
  const url = await s3.presignGet(`clips/${slug}.webm`);
  return {
    props: {
      url,
    },
  };
};

export default Play;
