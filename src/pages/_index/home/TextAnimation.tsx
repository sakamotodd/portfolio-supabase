import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/dist/TextPlugin';
import { ClassAttributes, LegacyRef, ReactElement, useCallback } from 'react';

type Props = {
  children: React.ReactNode;
  section: string;
};

const TextAnimation = (props: Props): ReactElement => {
  const textRef = useCallback(
    (node: any) => {
      if (node !== null) {
        const text = node.innerHTML; //テキストを読み込む
        const height = node.clientHeight; //高さを取得する
        node.innerHTML = ""; //テキストを削除する
        node.style.height = height + "px"; //高さを設定する
        setAnimation(text);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [],
  );
  const setAnimation = (text: string) => {
    const numText = text.length;
    const selector = '#' + props.section;
    gsap.registerPlugin(TextPlugin);
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, yoyo: true });
    tl.to(`${selector} .animation-text`, {
      duration: numText * 0.2,
      text: {
        value: text,
      },
      ease: 'none',
    });
  };

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <h1 ref={textRef} className="animation-text">
      {props.children}
    </h1>
  );
};

export default TextAnimation;
