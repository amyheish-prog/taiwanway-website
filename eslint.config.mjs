import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// eslint-config-next 16 起只提供 flat config，不能再用 FlatCompat 的 extends 載入
const eslintConfig = [...nextVitals, ...nextTs];

export default eslintConfig;
