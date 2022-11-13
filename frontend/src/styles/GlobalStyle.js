import { css, Global } from "@emotion/react";

const fontsStyle = css`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable-dynamic-subset.css");

  @font-face {
    font-family: "BinggraeSamanco";
    src: url("/fonts/BinggraeSamanco-Bold.woff") format("woff");
    font-weight: normal;
    font-style: normal;
  }
`;

export function GlobalStyle() {
  return <Global styles={fontsStyle} />;
}
