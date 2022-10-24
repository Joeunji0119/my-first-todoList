import { css } from 'styled-components';

const variables = {
  flex: (direction = 'row', justify = 'center', align = 'center') => `
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
    align-items: ${align};
  `,

  absoluteCenter: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,

  fixedCenter: css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,

  backGroundHover: css`
    border: 1px #ababab solid;
    border-radius: 17px;
    &:hover {
      box-shadow: 1px 1px 20px #ddd;
    }
  `,
};

export default variables;
