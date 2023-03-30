import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { BsTwitter } from 'react-icons/bs';

import getPrimaryColor from '@/libs/getPrimaryColor';

const SidebarLogo = () => {
  const router = useRouter();

  const { theme, resolvedTheme } = useTheme();

  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  return (
    <div
      onClick={() => router.push('/')}
      className="rounded-full h-14 w-14 p-4 flex items-center justify-center item-hover"
    >
      <BsTwitter size={28} color={isDark ? 'white' : getPrimaryColor()} />
    </div>
  );
};

export default SidebarLogo;
