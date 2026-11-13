import { BentoCaption, BentoTile } from "./bento-tile";

/** Big-number tile: recaps need no manual step. */
export const ZeroUploadsTile = () => (
  <BentoTile className="bg-white">
    <strong className="font-serif text-9xl leading-none font-normal tracking-tighter text-slate-900">
      0
    </strong>
    <BentoCaption
      title="Uploads needed."
      description="Recaps start the moment the call ends."
    />
  </BentoTile>
);
