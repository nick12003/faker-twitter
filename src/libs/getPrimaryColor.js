import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

const config = resolveConfig(tailwindConfig);

const primaryColor = config.theme.colors.primary;

const getPrimaryColor = () => primaryColor;

export default getPrimaryColor;
