import { FC } from "react";
import {
  BlockquoteLeft,
  TypeBold,
  TypeH1,
  TypeH2,
  TypeH3,
  TypeItalic,
} from "react-bootstrap-icons";
import { useMarkdownArea } from "../../hooks/useMarkdownArea";

const CommonMarkdown: FC = () => {
  const { TypeHClick } = useMarkdownArea();
  return (
    <div className="flex h-[10%] w-full items-center justify-around bg-white dark:bg-darkCard border">
      <TypeBold
        color="gray"
        size={32}
        className="cursor-pointer"
        type="button"
      />
      <TypeH1
        type="button"
        color="gray"
        size={32}
        className="cursor-pointer"
        onClick={() => TypeHClick("# ", 2)}
      />
      <TypeH2
        type="button"
        color="gray"
        size={32}
        className="cursor-pointer"
        onClick={() => TypeHClick("## ", 3)}
      />
      <TypeH3
        type="button"
        color="gray"
        size={32}
        className="cursor-pointer"
        onClick={() => TypeHClick("### ", 4)}
      />
      <TypeItalic
        type="button"
        color="gray"
        size={32}
        className="cursor-pointer"
      />
      <BlockquoteLeft
        type="button"
        color="gray"
        size={32}
        className="cursor-pointer"
      />
    </div>
  );
};

export default CommonMarkdown;
