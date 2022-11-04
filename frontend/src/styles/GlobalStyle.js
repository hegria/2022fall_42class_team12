import { css, Global } from "@emotion/react";

const fontsStyle = css`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable-dynamic-subset.css");

  @font-face {
    font-family: "BinggraeSamanco";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/BinggraeSamanco-Bold.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
`;

const globalStyles = css`
  ${fontsStyle};

  html {
    background-color: "gray.50";
  }
`;

export function GlobalStyle() {
  return <Global styles={globalStyles} />;
}
