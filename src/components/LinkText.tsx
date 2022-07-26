interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function (props: Props) {
  return (
    <p
      className={`${
        props.className ?? ""
      } text-zinc-500 hover:text-zinc-800 text-lg transition-colors`}
    >
      {props.children}
    </p>
  );
}
