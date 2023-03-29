import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const LanguageSwitch = ({ className }) => {
  const { pathname, query, locale } = useRouter();

  return (
    <Link
      className={classNames('p-1 text-xl leading-6 transition-colors', className)}
      locale={locale === 'en' ? 'zh-TW' : 'en'}
      href={{ pathname, query }}
    >
      {locale === 'zh-TW' && 'EN'}
      {locale === 'en' && '中文'}
    </Link>
  );
};

LanguageSwitch.defaultProps = {
  classNames: '',
};

LanguageSwitch.propTypes = {
  classNames: PropTypes.string,
};

export default LanguageSwitch;
