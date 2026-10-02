import { Fragment } from "react";

/** Splits a heading into words so each one can materialize with a stagger (see .mw in sections.css). */
export default function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <Fragment key={i}>
          {i > 0 ? " " : null}
          <span className="mw" style={{ ["--w" as string]: i }}>
            {w}
          </span>
        </Fragment>
      ))}
    </>
  );
}
