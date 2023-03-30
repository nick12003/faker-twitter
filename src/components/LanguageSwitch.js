import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import IconButton from './IconButton';
import { FaLanguage } from 'react-icons/fa';

const LanguageSwitch = ({ className }) => {
  const { pathname, query, locale } = useRouter();

  return (
    <Link
      className={classNames('p-1 text-xl leading-6 transition-colors', className)}
      locale={locale === 'en' ? 'zh-TW' : 'en'}
      href={{ pathname, query }}
    >
      <IconButton>
        <FaLanguage />
      </IconButton>

      {/* {locale === 'zh-TW' && 'EN'}
      {locale === 'en' && '中文'} */}
    </Link>
  );
};

export default LanguageSwitch;
