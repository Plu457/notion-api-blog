import { GetStaticProps } from 'next';
import { ExtendedRecordMap } from 'notion-types';
import { useRouter } from 'next/router';

import { getPageContent } from '@/cms/notion';
import { HeadMeta, NotionPageRenderer } from '@/components';

interface ProfilePageProps {
  recordMap: ExtendedRecordMap;
}

const ProfilePage = ({ recordMap }: ProfilePageProps) => {
  const { pathname } = useRouter();

  return (
    <>
      <HeadMeta />
      <section>
        <NotionPageRenderer recordMap={recordMap} isProfilePage={pathname} />
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
