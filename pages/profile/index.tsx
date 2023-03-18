import { GetStaticProps } from 'next';
import { ExtendedRecordMap } from 'notion-types';
import { getPageContent } from '@/cms/notion';

import NotionPageRenderer from '@/components/NotionPageRenderer';
import HeadMeta from '@/components/HeadMeta';

interface ProfilePageProps {
  recordMap: ExtendedRecordMap;
}

const ProfilePage = ({ recordMap }: ProfilePageProps) => {
  return (
    <>
      <HeadMeta />
      <section>
        <NotionPageRenderer recordMap={recordMap} />
      </section>
    </>
  );
};

export default ProfilePage;

export const getStaticProps: GetStaticProps<ProfilePageProps> = async () => {
  const profilePageId = process.env.PROFILE_ID;

  if (!profilePageId) throw new Error('PROFILE_ID is not defined');

  try {
    const recordMap = await getPageContent(profilePageId);

    return {
      props: { recordMap },
      revalidate: 60,
    };
  } catch (error) {
    throw new Error('Error while fetching profile page');
  }
};
